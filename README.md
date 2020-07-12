# Responsify
Responsify generates CSS `calc()` values that use `%` or `vw` to smoothen the change in element's size on different resolutions.

## Notes
There's a more advanced version of this tool that generates bezier `calc()` functions: https://andersriggelsen.dk/nonlinear.

## Todos
- handle grid container not shrinking on small resolutions
- make screen reader announce `calc()` value on form `submit`
    - `<output aria-live="assertive">`??