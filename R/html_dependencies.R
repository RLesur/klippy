#' Provide HTML dependencies
#'
#' These functions provide HTML dependencies for \code{clipboard.js},
#' \code{klippy} and \code{Primer Tooltips CSS} for re-use.
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
    version = '0.0.0.9500',
    src = 'htmldependencies/lib/klippy-0.0.0.9500',
    script = 'js/klippy.min.js',
    stylesheet = 'css/klippy.min.css',
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
  list(html_dependency_clipboard(),
       html_dependency_primer_tooltips(),
       html_dependency_klippy()
  )
}
