# Gecko Table Cell Position Polyfill

A polyfill for Gecko layout engine (i.e. Firefox) that let you use CSS `position` property on `display: table-cell` elements (i.e. `td`) without facing the #35168(https://bugzilla.mozilla.org/show_bug.cgi?id=35168) Firefox bug **opened in 2000 year, 14 years ago**.

## Usage

Automatic.

Works only on Gecko layout engine.

Any element that have `display: table-cell` and `position` styles will be handled.

Hope you will like it.

## How it works

So if you have this:

```html
<table>
  <tr>
    <td>
      <span></span>
    </td>
  </tr>
</table>  
```

```css
td {
  position: relative; /* I see your fear: “Aww! This will now work in Firefox!” */
}
td span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

So in Firefox you will see:

```html
<table>
  <tr>
    <td style='padding: 0'>
      <div class='gecko-cell-wrapper' style='position: relative; height: 127px;'>
        <span></span>
      </div>
    </td>
  </tr>
</table> 
```

Actually `.gecko-cell-wrapper` will have `height` not exactly `127px`. It will be the computed by browser height of handled `table-cell` element.

## Requirements

- jQuery *because original code uses it*
- [Bowser](https://github.com/ded/bowser) *because this feature was cutted out from jQuery*

## Install

Add a link to `firefox-table-position-polyfill.js` after dependencies and it will work.

```html
<script src='/path/to/firefox-table-position-polyfill.js'></script>
```

## TODO

- Let using this polyfill only on elements with user defined selector, i.e.

  ```js
  $('.hello-from-2000-mozilla').gecko_table_position_polyfill();
  ```
- Let you to customize inner element class name.
- Let you customize to use or not use of launching recompute function on window resize (now it does by default).
- Figure out why the hell I need to set `padding` to `0` for handled `table-cell` element.
- Replace universal selector with more fast thing. I dunno, I'm noob, lol.
  

## Contribution

I am a noob in all this JS things and will be happy if you will optimize this code or add some features listed above.

## References

- [Answer](http://stackoverflow.com/a/13036256/766307) to question “[Does Firefox support position: relative on table elements?](http://stackoverflow.com/q/5148041/766307)” on StackOverflow by [mrbinky3000](http://stackoverflow.com/users/331503/mrbinky3000). I updated his code just a little to let me use it on my other projects.
