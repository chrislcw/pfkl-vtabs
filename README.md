# A simple jQuery tab plugin

## Usage

### JS codes

```
import "pfkl-vtabs/vtabs/vtabs.min.js";

$('.your-element').vtabs({
  'hover': false,
  'mobileOnly': false,
  'variableHeight': true,
  'mobileViewportWidth': 639,
})
```

### HTML codes

```
<div class="your-element">
  <div class="vtabs-toggles">
    <div class="vtab-toggle" data-target="#tc1">Tab 1</div>
    <div class="vtab-toggle" data-target="#tc2">Tab 2</div>
  </div>
  <div class="vtabs-content">
    <div class="vtab-content" id="tc1">...</div>
    <div class="vtab-content" id="tc2">...</div>
  </div>
</div>
```
