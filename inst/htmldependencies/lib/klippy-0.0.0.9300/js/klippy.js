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

function initKlippy() {
  document.addEventListener("DOMContentLoaded", function() {
    var clippyHref = document.getElementById("octicons-1-attachment").href;
    var klippyButton = "<button type='button' class='btn-klippy tooltipped tooltipped-e tooltipped-no-delay' aria-label='Copy to clipboard' onblur='changeTooltipMessage(this,&quot;Copy to clipboard&quot;)' data-clipboard-klippy><div><img class='octicon' src='"+clippyHref+"' alt='Copy'></div></button>";

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
