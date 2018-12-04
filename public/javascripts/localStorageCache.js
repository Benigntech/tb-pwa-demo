

class LocalStorageCache {

    constructor( cacheName ){
        this._cacheName = cacheName || "ln-cache";
    }

    getCache( name ){

        const cache = this.cache;

        const response = cache[name];

        return response || null;
    }

    open( name ){
        return new CacheManager(name, this.cacheName);
    }

    putCache( name, data ){

        const cache = this.cache;

        cache[name] = data;

        const allCache = this.allCache;

        const username = "user";

        allCache[username] = cache;

        window.localStorage.setItem(this.cacheName, JSON.stringify( allCache ));
    }

    get cache(){

        const cache = this.allCache;

        const username = "user";

        return cache[username] || {}
    }

    get allCache(){

        return JSON.parse( window.localStorage.getItem(this.cacheName) ) || {};
    }

    get cacheName() {
        return this._cacheName;
    }
}

class CacheManager extends LocalStorageCache{

    constructor(name, cacheName){

        super(cacheName);

        this._name = name;

        const cache = this.cache;

        this._result = cache[this.name] || {};
    }

    put( name, data ){

        if(!name) name = "default";

        const cache = this.result;

        cache[name] = { data, time: new Date() };

        this._result = cache;

        this.update();
    }

    get(name){

        const result = this.result;

        const data = result[name];

        return data ? data : null;
    }

    clear(){

        this._result = {};

        this.update();
    }

    update(){
        this.putCache( this.name, this._result);
    }

    delete(name){
        if(!name) return;
        delete this._result[name];
        this.update();
    }

    /**
     *
     * @param name
     * @returns {{secondsAgo: number, minutesAgo: number, hoursAgo: number, daysAgo: number, monthsAgo: number, yearsAgo: number}|null}
     */
    timeDiff( name ){

        const result = this.get(name);

        if (!result) return null;

        const lastUpdateTime = result.time ? result.time : null;

        if (lastUpdateTime) {

            const timeInMs = new Date(lastUpdateTime).getTime();

            const endTimeInMS = new Date().getTime();

            let timeDifference = endTimeInMS - timeInMs;

            /**
             * time difference in seconds
             * @type {number}
             */
            const secondsAgo = timeDifference/1000;

            /**
             * time difference in minutes
             * @type {number}
             */
            const minutesAgo = secondsAgo/60;

            /**
             * time difference in hours
             * @type {number}
             */
            const hoursAgo = minutesAgo/60;

            /**
             * time difference in days
             * @type {number}
             */
            const daysAgo = hoursAgo/24;

            /**
             * time difference in months
             * @type {number}
             */
            const monthsAgo = daysAgo/30;

            /**
             * time difference in years
             * @type {number}
             */
            const yearsAgo = monthsAgo/12;

            return { secondsAgo, minutesAgo, hoursAgo, daysAgo, monthsAgo, yearsAgo }

        } else {
            return null;
        }
    }

    get name() {
        return this._name;
    }

    get result() {
        const cache = this.cache;

        this._result = cache[this.name] || {};

        return this._result;
    }
}
