# scoped-css.js

scoped-css-js automatically scopes your css client-side.

## Install

Add this to your head

```html
<script src="https://ilijazm.github.io/scoped-css-js/scoped-css.min.js" defer></script>
```

## Usage

To scope your css just add the attribute ``scoped`` to it. The style will apply on all ``a``-tags inside the ``nav``. 

```html
<nav>
    <a href="/">Home</a>
    <a href="/About">About</a>
    <a href="/Contact">Contact</a>

    <style scoped>
        a {
            color: black;
            text-decoration: none;
        }
    </style>
</nav>
```

If you want to style the parent element (in this case the ``nav`` element) you can use the selector ``#this``.

```html
<nav>
    <style scoped>
        #this {
            width: 100%;
            height: 70px;

            background: #eee;
        }
    </style>
</nav>
```

You can also set a custom scope using the attribute ``scope``.

```html
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/About">About</a></li>
    <li><a href="/Contact">Contact</a></li>
</ul>

<style scope="ul li">
    a {
        color: black;
        text-decoration: none;
    }
</style>
```

scoped-css-js provides two functions to manually scan for new scoped styles that did not got converted yet.

```javascript
scopeStyles(element)
```

This will scan for style elements with the ``scoped`` or ``scope`` attribute on the parent element ``element`` and apply the scope to it.

```javascript
scopeAllElements()
```

This will scan for style elements with the ``scoped`` or ``scope`` attribute on the parent element ``element`` and apply the scope to it.