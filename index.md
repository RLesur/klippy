# <img src="reference/figures/logo.png" alt="logo" style="float: right;height: 3.5em;" />klippy<br />Copy to Clipboard Buttons for R Markdown HTML Documents 

**klippy** enhances R Markdown HTML documents with **“copy to clipboard”
buttons** as shown below:

![](reference/figures/klippy.png "example")

## Installation

`klippy` is not available from CRAN, but you can install the development
version from GitHub with:

``` r
# install.packages("remotes")
remotes::install_github("rlesur/klippy")
```

## Motivation

As an intensive reader of R Markdown books and documents (thanks to
`knitr`), I selected on my screen dozens of R code blocks then press
`Ctrl+C`…  
This package is a very small, but I hope helpful add-in for R Markdown
to improve the reader experience.

## Usage

Add the following chunk anywhere in your `Rmd` file:

```` r
```{r klippy, echo=FALSE, include=TRUE}
klippy::klippy()
```
````

## Browser Support

The `klippy` package uses [clipboard.js](https://clipboardjs.com/). 
Tooltips are rendered with
[Primer Tooltips](http://primercss.io/).  
Glue code is in Vanilla JS. For supported browsers, see [`clipboard.js`
documentation](https://clipboardjs.com/#browser-support).

## Bugs/Feature requests

If you have any, [let me know](https://github.com/RLesur/klippy/issues).
Thanks\!

## Related project

To use `clipboard.js` in Shiny, see `rclipboard`
([CRAN](https://cran.r-project.org/package=rclipboard),
[GitHub](https://github.com/sbihorel/rclipboard)).
