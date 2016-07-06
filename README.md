jquery-popup
============

Multipurpose jQuery Popup that auto positions and auto recognizes form and POST action behaviours.

----------------------------------------------------
USAGE AND INITIALIZATION
----------------------------------------------------

Load a popup URL.
```
Popup.init({
  width: 300,
  height : 400,
  variables : {
    // Variables can be passed into the popup on initilization.
  },
  url : 'popup.html',
  nopadding: (true/false),
  fullscreen: (true/false),
  callback: function() {
    // Callback functionality to alter the parent that 
    // is called using Popup.callback({});
  }
  
});
```

Loading HTML content.
```
Popup.init({
  width: 300,
  height : 400,
  content : '<b>HTML TEXT</b>'
});
```

Load HTML content.
```
Popup.alert({
  content : 'This is a simple alert'
});
```

Calling the Callback
```
Popup.callback({});
```

Reset the position of the popup.
```
Popup.position();
```

Close the popup.
```
Popup.close();
```
