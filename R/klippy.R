#' Insert copy to clipboard buttons in HTML documents
#'
#' \code{klippy} insert copy to clipboard buttons (or "klippies") in \code{R}
#' \code{Markdown} \code{HTML} documents. In the rendered document, "klippies"
#' are inserted in the upper right corner of the code chunks. \code{klippy()}
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
#' rmarkdown::render(tf[1], "html_document", tf[2])
#'
#' \dontrun{
#' browseURL(paste0("file://", tf[2]))}
#'
#' @import assertthat
#' @importFrom htmltools htmlDependency
#' @importFrom htmltools tags
#' @importFrom htmltools attachDependencies
#' @importFrom stringi stri_extract_all_words
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

  #' @section HTML Dependencies:
  #' \code{klippy} package includes several third parties \code{JavaScript}
  #' libraries that are declared as \code{HTML} dependencies:
  #' \itemize{
  #'   \item \code{jQuery-1.11.3}, (c) jQuery Foundation, Inc.
  #'   \href{https://jquery.org/license/}{MIT license}.
  #'   \href{https://jquery.com/}{Website}.
  jqueryDep <- htmltools::htmlDependency(
    name = 'jquery',
    version = '1.11.3',
    src = 'htmldependencies/lib/jquery-1.11.3',
    script = 'jquery-1.11.3.min.js',
    package = 'klippy'
  )
  #'   \item \code{Bootstrap-3.3.5}, (c) Twitter, Inc.
  #'   \href{https://github.com/twbs/bootstrap/blob/v3.3.5/LICENSE}{MIT license}.
  #'   \href{http://getbootstrap.com}{Website}.
  bootstrapDep <- htmltools::htmlDependency(
    name = 'bootstrap',
    version = '3.3.5',
    src = 'htmldependencies/lib/bootstrap-3.3.5',
    script = 'dist/js/bootstrap.min.js',
    stylesheet = 'dist/css/bootstrap.min.css',
    package = 'klippy'
  )
  #'   \item \code{clipboard.js-1.7.1}, (c) Zeno Rocha
  #'   \email{hi@@zenorocha.com}.
  #'   \href{http://zenorocha.mit-license.org/}{MIT license}.
  #'   \href{https://clipboardjs.com/}{Website}.}
  clipboardDep <- htmltools::htmlDependency(
    name = 'clipboard',
    version = '1.7.1',
    src = 'htmldependencies/lib/clipboard-1.7.1',
    script = 'clipboard.min.js',
    package = 'klippy'
  )
  klippyDep <- htmltools::htmlDependency(
    name = 'klippy',
    version = '0.0.0.9000',
    src = 'htmldependencies/lib/klippy-0.0.0.9000',
    script = 'js/klippy.min.js',
    stylesheet = 'css/klippy.min.css',
    package = 'klippy'
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

  #' @return An \code{HTML \link[htmltools]{tag} object}.
  # Attach dependencies to JS script:
  klippyScript <- htmltools::attachDependencies(
    htmltools::tags$script(js_script),
    list(jqueryDep, bootstrapDep, clipboardDep, klippyDep)
  )

  return(klippyScript)
}
