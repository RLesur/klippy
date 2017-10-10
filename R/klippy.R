#' @import assertthat
#' @importFrom htmltools htmlDependency
#' @importFrom htmltools tags
#' @importFrom htmltools attachDependencies
#' @importFrom stringi stri_extract_all_words
NULL

#' Provide HTML dependencies
#'
#' These functions provide HTML dependencies for \code{clipboard.js},
#' \code{klippy} and \code{octicon-clippy} for re-use.
#' @name html-dependencies
#' @return An object that can be included in a list of dependencies passed to
#' \code{\link[htmltools]{attachDependencies}}.
#' @family HTML dependencies functions
NULL

#' @rdname html-dependencies
#' @export
html_dependency_clipboard <- function() {
  htmltools::htmlDependency(
    name = 'clipboard',
    version = '1.7.1',
    src = c(
      file = 'htmldependencies/lib/clipboard-1.7.1',
      href = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/'
      ),
    script = 'clipboard.min.js',
    package = 'klippy'
  )
}

#' @rdname html-dependencies
#' @export
html_dependency_primer_tooltips <- function() {
  htmltools::htmlDependency(
    name = 'primer-tooltips',
    version = '1.4.0',
    src = c(
      file = 'htmldependencies/lib/primer-tooltips-1.4.0',
      href = 'https://cdn.jsdelivr.net/npm/primer-tooltips@1.4.0/build/'
      ),
    stylesheet = 'build.css',
    package = 'klippy',
    all_files = FALSE
  )
}

#' @rdname html-dependencies
#' @export
html_dependency_klippy <- function() {
  htmltools::htmlDependency(
    name = 'klippy',
    version = '0.0.0.9300',
    src = 'htmldependencies/lib/klippy-0.0.0.9300',
    script = 'js/klippy.js',
    stylesheet = 'css/klippy.css',
    package = 'klippy',
    all_files = FALSE
  )
}

#' @rdname html-dependencies
#' @export
html_dependency_octicon_clippy <- function() {
  htmltools::htmlDependency(
    name = 'octicons',
    version = '6.0.1',
    src = 'htmldependencies/lib/octicons-6.0.1',
    attachment = 'clippy.svg',
    package = 'klippy',
    all_files = FALSE
  )
}

#' List klippy dependencies
#'
#' This function is used to get the list of \code{klippy} dependencies.
#'
#' @return A list of dependencies that can be passed to
#' \code{\link[htmltools]{attachDependencies}} or
#' \code{\link[rmarkdown]{html_document_base}}.
#' @family HTML dependencies functions
#' @export
klippy_dependencies <- function() {
  return(list(html_dependency_clipboard(),
              html_dependency_primer_tooltips(),
              html_dependency_klippy(),
              html_dependency_octicon_clippy()
  ))
}

#' Insert copy to clipboard buttons in HTML documents
#'
#' \code{klippy} insert copy to clipboard buttons (or "klippies") in \code{R}
#' \code{Markdown} \code{HTML} documents. In the rendered document, "klippies"
#' are inserted in the upper left corner of the code chunks. \code{klippy()}
#' function is suited for a call in a \code{knitr} code chunk.
#'
#' \code{klippy()} function appends \code{JavaScript} functions and \code{CSS} in
#' the rendered document that:
#' \enumerate{
#' \item Add \code{klippy} to the class attribute of selected \code{<pre>}
#' elements.
#' \item Add a \code{<button>} element (a "klippy") as a child for all
#' \code{<pre>} elements with a \code{klippy} class attribute.
#' \item Instantiate \code{clipboard.js} event listeners and attach them to
#' \code{klippies}.}
#' \code{klippy} class can also be appended to a \code{<pre>} element using
#' \href{https://yihui.name/knitr/options/}{\code{knitr class.source} chunk
#' option}. "Klippy" buttons are not rendered if the browser does not support
#' \code{clipboard.js} library (see \href{https://clipboardjs.com/}{here} for
#' details).
#'
#' @examples
#' tf <- tempfile(fileext = c(".Rmd", ".html"))
#' writeLines(
#'   c("```{r klippy, echo=FALSE, include=TRUE}",
#'     "klippy::klippy()",
#'     "```",
#'     "Insert this chunk in your `Rmd` file:",
#'     "````markdown",
#'     "`r ''````{r klippy, echo=FALSE, include=TRUE}",
#'     "klippy::klippy()",
#'     "```",
#'     "````"
#'   ),
#'   tf[1]
#' )
#'
#' \dontrun{
#' rmarkdown::render(tf[1], "html_document", tf[2])
#' browseURL(paste0("file://", tf[2]))}
#'
#'
#' @export
klippy <- function(lang = "r markdown", all_precode = FALSE) {

  #' @param lang A character string or a vector of character strings with
  #'     language names. If a character string contains multiple languages
  #'     names, these names have to be separated by boundaries (e.g., spaces).
  #'     Void string can be passed to \code{lang} argument.
  assertthat::assert_that(is.character(lang))

  #' @param all_precode A logical scalar. If \code{TRUE}, a "klippy" is
  #'     added to all \code{HTML <pre>} elements having an \code{HTML <code>}
  #'     element as a child.
  assertthat::assert_that(
    is.logical(all_precode),
    assertthat::is.scalar(all_precode),
    assertthat::noNA(all_precode)
  )

  # Build JS script
  # Initialization:
  js_script <- ''

  if(all_precode) {
    # Add klippy class to <pre>...<code></code>...</pre> elements:
    js_script <- paste(js_script, '  addClassKlippyToPreCode();', sep = '\n')
  }

  # Add klippy class to <pre> elements with a class attribute in lang:
  classes <- unlist(stringi::stri_extract_all_words(lang))
  classes <- classes[!is.na(classes)]
  if(length(classes) > 0) {
    selector <- paste0('pre.', classes, collapse = ', ')
    js_script <- paste(
      js_script,
      paste0('  addClassKlippyTo("', selector, '");'),
      sep = '\n')
  }

  # Add a klippy button to all elements with klippy class attribute:
  js_script <- paste(js_script, '  addKlippy();\n', sep = '\n')

  #' @return An HTML tag object that can be rendered as HTML using
  #' \code{\link{as.character}()}.
  # Attach dependencies to JS script:
  klippyScript <- htmltools::attachDependencies(
    htmltools::tags$script(js_script),
    klippy_dependencies()
  )

  return(klippyScript)
}
