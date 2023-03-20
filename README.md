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
  'mutationSpeed': 300,
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

### Change log

**v1.0.9**
Added new settings param `mutationSpeed` for height mutating child elements in the tab content.
Default value is `300`. Please match the transition timing value of any child elements in the tab content.