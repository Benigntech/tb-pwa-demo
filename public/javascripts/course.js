
const cache = localStorageCache.open("add-to-cart-requested");

const $alertContainer = $('.alert-container');

const $cartTable = $('.cart-table tbody');

const $courseTable = $(".course-table");

const addItemToCart = courseId => {
    return new Promise(( resolve, reject ) => {
        $.ajax({
            url: `/cart/add`,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({courseId}),
            success: resolve,
            error: reject
        })
    });
};

const removeItemFromCourseList = (itemList = []) => {
    itemList.map( item => {
        const $item = $courseTable.find(`[data-id="${ item }"]`);
        if($item.length){
            const $tr = $item.closest("tr");
            $tr.remove();
        }
    });
};

const cartListTemplate = item => {
    return `
        <tr class="pending">
            <td>${ item.name }</td>
            <td>${ item.description }</td>
            <td>${ item.price }</td>
            <td>
                <button class="btn btn-warning disabled" data-id="${ item.id }" >Pending...</button>
            </td>
        </tr>
    `;
};

const addItemToCartList = (itemList = []) => {
    $(".pending").remove();
    itemList.map( item => {
        if ($(`.pending [data-id="${ item.id }"]`).length) return;
        const template = cartListTemplate(item);
        $cartTable.append(template);
    });
};

const checkAndUpdateItemList = () => {

    const {items = {data: []}} = cache.result;

    const {data} = items;

    if ($courseTable.length) removeItemFromCourseList(data);

    if ($cartTable.length) addItemToCartList(data);

    if( window.navigator.onLine && data.length ) {

        $alertContainer.empty();

        const allPromise = [];

        data.map(item => allPromise.push(addItemToCart(item.id)));

        Promise.all(allPromise)
            .then(response => {
                location.reload();
            })
            .catch(error => {
                location.reload();
            });

        cache.put("items", []);
    } else {

        if (data.length) $alertContainer.html(
            `<div class="alert alert-warning">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                You have ${ data.length } requests pending, please connect to the internet to update your request.
            </div>`
        );
    }
};

window.addEventListener("load", () => {
    checkAndUpdateItemList();
}, true);

window.addEventListener("online", () => {
    checkAndUpdateItemList();
}, true);

window.addEventListener("offline", () => {
    checkAndUpdateItemList();
}, true);


$(document).on("click", ".add-cart-btn", function () {
    const $this = $(this);
    const courseId = $this.data("id");
    const $tr = $this.closest("tr");

    if( window.navigator.onLine ) {

        addItemToCart(courseId)
            .then(response => {
                $tr.remove();
                $.notify(response.message, "success");
            })
            .catch(error => {
                $.notify(error.responseJSON.message, "error");
            })
    } else {

        const {items = {data: []}} = cache.result;

        const {data} = items;

        const name = $this.data("name");

        const description = $this.data("description");

        const price = $this.data("price");

        data.push({
            id: courseId,
            name,
            description,
            price
        });

        cache.put("items", data);

        $tr.remove();

        $.notify("Your request has been recorded, please connect to the internet to update your requested", "success");

        checkAndUpdateItemList();
    }
});