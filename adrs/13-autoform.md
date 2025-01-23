tested, ran into issues
https://github.com/vantezzen/autoform/issues/138


23.01.2025
testing on the forms page
the form is generic and we use json forms to get the correct json
all the rest is just transformations, not to write the forms manually

to add a new form we need:
- filesystem URL
- schema in ZOD


adna a separate filetree component with a file context and the backend is stateless and agnostic on the file location

okay actually using the ui schema makes this less useful to do fast

okay maybe just make the schema automatic by default only customize if something is wrong.

also add the custom formatter to work things on the edited file, just like with the scripting editor
