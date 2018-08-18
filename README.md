## grouploop.js - A simple jQuery plugin

A jquery plugin that creates a marquee with any group of DOM elements, with a variety of options.

[Live Demo](https://grouploop-demos.netlify.com/examples/)

### Setup

Include jQuery and the library in your html:

`<script type="text/javascript" src="dist/grouploop-1.0.0.min.js"></script>`

Create a container with a unique id and group some elements in a wrapper.

```
<div id="grouploop-1">
  <div class="item-wrap">
    <div class="item">Promo 1</div>
    <div class="item">Promo 2</div>
    <div class="item">Promo 3</div>
    <div class="item">Promo 4</div>
    <div class="item">Promo 5</div>
    ...
  </div>
</div>
```

Select your DOM element id with jQuery and call **_.grouploop()_** with or without options.

```
$("#grouploop-1").grouploop({
  velocity: 2,
  forward: false,
  childNode: ".item",
  childWrapper: ".item-wrap",
  pauseOnHover: true,
  complete: function() {
    console.log("init");
},
  stickFirstItem: true
```

### Notes

At a min-width(768px) the plugin will automatically double the transform travel distance of the item wrapper. It is recommended that in your CSS you ensure your wrapper width is also doubled at < 768px. (See the example)

The animations use requestAnimationFrame() to ensure the device has processing power available before rendering the next frame.

Check out the examples folder to see grouploop in action.
