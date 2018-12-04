
const manageSw = () => {

    const addToCartRegex = /(.*)\/cart\/add(.*)/;

    const addItemToCache = (name, data) => {

    };


    self.addEventListener('fetch', function (event) {

        let url = event.request.url;

        if (url.match(addToCartRegex)) {
            console.log(event.request);
            if ( !navigator.onLine) {
                return fetch(event.request);
            } else {

            }
        }

    });
};

manageSw();