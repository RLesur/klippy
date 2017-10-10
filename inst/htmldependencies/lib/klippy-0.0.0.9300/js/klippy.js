function addClassKlippyToPreCode() {
  document.addEventListener("DOMContentLoaded", function() {
    var targetedCodes = document.querySelectorAll("pre > code");
    for (var i = 0; i < targetedCodes.length; i += 1) {
      targetedCodes.item(i).parentElement.className += ' klippy';
    }
  });
}

function addClassKlippyTo(selector) {
  document.addEventListener("DOMContentLoaded", function() {
    var targetedChunks = document.querySelectorAll(selector);
    for (var i = 0; i < targetedChunks.length; i += 1) {
      targetedChunks.item(i).className += ' klippy';
    }
  });
}

function changeTooltipMessage(element, msg) {
  element.setAttribute('aria-label', msg);
}

function getOcticonClippy() {
  return '<svg version="1.1" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g class="clippy" fill="#000"><path d="m2 13h4v1h-4v-1zm5-6h-5v1h5v-1zm2 3v-2l-3 3 3 3v-2h5v-2h-5zm-4.5-1h-2.5v1h2.5v-1zm-2.5 3h2.5v-1h-2.5v1zm9 1h1v2c-0.02 0.28-0.11 0.52-0.3 0.7s-0.42 0.28-0.7 0.3h-10c-0.55 0-1-0.45-1-1v-11c0-0.55 0.45-1 1-1h3c0-1.11 0.89-2 2-2s2 0.89 2 2h3c0.55 0 1 0.45 1 1v5h-1v-3h-10v9h10v-2zm-9-8h8c0-0.55-0.45-1-1-1h-1c-0.55 0-1-0.45-1-1s-0.45-1-1-1-1 0.45-1 1-0.45 1-1 1h-1c-0.55 0-1 0.45-1 1z"/></g></g></svg>';
}

function initKlippy() {
  document.addEventListener("DOMContentLoaded", function() {
    var clippyHref = document.getElementById("octicons-1-attachment").href;
    var klippyButton = "<button type='button' class='btn-klippy tooltipped tooltipped-e tooltipped-no-delay' aria-label='Copy to clipboard' onblur='changeTooltipMessage(this,&quot;Copy to clipboard&quot;)' data-clipboard-klippy><object class='octicon' data='"+clippyHref+"' type='image/svg+xml'></object></button>";
    // clickable object:
    // https://teamtreehouse.com/community/how-do-you-make-a-svg-clickable

    // Insert klippy buttons:
    var codeNodeList = document.querySelectorAll(".klippy > code");
    for (var i = 0; i < codeNodeList.length; i += 1) {
      codeNodeList.item(i).insertAdjacentHTML('beforebegin', klippyButton);
    }

    // Auto-size klippies:
    var klippiesCollection = document.getElementsByClassName("btn-klippy");
    for (var j = 0; j < klippiesCollection.length; j += 1) {
      var currentKlippy = klippiesCollection[j];
      var klippyParent = currentKlippy.parentElement;
      var paddingParent = window.getComputedStyle(klippyParent).getPropertyValue('padding-left');
      currentKlippy.querySelector('.octicon').setAttribute('width', paddingParent);
    }

    // Color klippies:
    // https://stackoverflow.com/questions/4476526/do-i-use-img-object-or-embed-for-svg-files

    // Initialize clipboard:
    var clipboardKlippies=new Clipboard('[data-clipboard-klippy]',{
      text: function(trigger) {
        return trigger.parentNode.querySelector("code").textContent;
      }
    });

    clipboardKlippies.on('success', function(e) {
      changeTooltipMessage(e.trigger, 'Copied!');
      e.clearSelection();
    });

    clipboardKlippies.on('error', function() {
      changeTooltipMessage(e.trigger,'Press Ctrl+C or Command+C to copy');
    });
  });
}

function addKlippy() {
  if(Clipboard.isSupported()) initKlippy();
}
