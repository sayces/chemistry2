### BookingFlow
- is the key detail of date and time convenience since picking a day of the Calendar for choosing appointment's time and included services.

BookingFlow component is presented as a shell or a global form for SelectionPanel(s), UmbicialLine, Confirm Button and so on.

BookingFlow (as a widget) ->
__ UmbicialLine -> 
__ __ connecting animation
__ __ positioning
__ SelectionPanel(s)
__ Confirmation Button
__ animations' logic

### UmbicialLine + BookingFlow --- behaviour

- UmbicialLine always should be started from (start anchor) a picked day to (end anchor) the BookingFlow's nearest edge (left, as default).
- As we know, BookingFlow component includes at least several SelectionPanels for each group  