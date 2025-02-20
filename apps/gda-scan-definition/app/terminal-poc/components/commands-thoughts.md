
# Available console commands in addition to Jython syntax:


BUT AT THE MOMENT WE CAN RUN THEM ALL 

so the safe-gda-terminal proof of concept should use those - from the existing ones
maybe just 1 scan type
and it's safe to request those that are read only anyway

the main check is 'is scannable'
but what python commands to people use?

maybe a separate one?
but wait we need for loops for that. maybe it wouldn't be that great

help                            -prints this message

## position changes - postMessage, inc UploadSharp, uninc, watch
small epics wrapper?
- pos <scannable>                 -gets the current position of the object
- pos <scannable> new_position    -moves the object to the new position
- watch <scannable>               -adds the scannable to the watch sub-panel in the terminal panel.

inc <scannable> increment       -incremental move by the given amount
upos <scannable> new_position   -pos command without print out during the move
uinc <scannable> increment      -inc command without print out during the move

## list devices: ls interface - endpoint and ls_names = rejected
ls                              -list all the interfaces of existing objects
ls interfaceName                -lists all the objects of the given type (interface)
https://github.com/DiamondLightSource/blueapi/issues/829

## scan running and pausing
scan-running and pausing

various scan types

## rejected

defaults already described in scan parameter schema
list_defaults                   -lists all objects which would be used in a scan by default
add_default <scannable>         -add an object to the defaults list
remove_default <scannable>      -remove an object from the defaults list
