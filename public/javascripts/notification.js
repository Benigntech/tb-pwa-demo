//Request for permission
Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

//Example 1 Notification
function displayNotification1() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification('Hello TechBhubaneswar!');
    });
  }
}

//Example 2 Notification
//with options
function displayNotification2() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      reg.showNotification('Hello TechBhubaneswar!', options);
    });
  }
}

//Example 3 Notification
// with User interaction
function displayNotification3() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]
      };
      reg.showNotification('Hello TechBhubaneswar!', options);
    });
  }
}

// to subscribe user to push service
function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}

if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register('/sw.js').then(function(reg) {
  //   console.log('Service Worker Registered!', reg);

    // reg.pushManager.getSubscription().then(function(sub) {
    //   if (sub === null) {
    //     // Update UI to ask user to register for Push
    //     console.log('Not subscribed to push service!');
    //   } else {
    //     // We have a subscription, update the database
    //     console.log('Subscription object: ', sub);
    //   }
    // });

   // .catch(function(err) {
   //  console.log('Service Worker registration failed: ', err);
   // });
}

//listening event inside Service serviceWorker
/*
//On notificationclose
self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});
*/

/*
// on notification click

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.example.com');
    notification.close();
  }
});

*/


//on service worker
// to listen to push service

/*
self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});
*/
