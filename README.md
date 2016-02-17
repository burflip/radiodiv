# Radiodiv
JQuery plugin for making radio/checkbox like divs

Currently only data-based functionality is working

##USAGE
Fields structure:
```javascript
"hidden_field_id":{
      selectors:[],
      type:"radio" // or "checkbox",
      selected:true,
      value:"string"
}
```
 
Inline declaration only for radio.

You may add "radiodiv" class to each div.

Data attributes:


`data-rd-name="string"`

`data-rd-selected=true // optional, default = false`

`data-rd-value="string"`