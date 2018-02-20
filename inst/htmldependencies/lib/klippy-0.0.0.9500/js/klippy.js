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

function getUriOcticonClippy(klippyColor, klippyOpacity) {
  var color;
  if (klippyColor === 'auto') {
    var a = document.createElement('a');
    document.body.appendChild(a);
    color = window.getComputedStyle(a).getPropertyValue('color');
    document.body.removeChild(a);
  } else {
    color = klippyColor;
  }
  // The following SVG image is Octicons Clippy (version 6.0.1) (c) GitHub, Inc. - MIT License
  // MIT license: https://github.com/primer/octicons/blob/v6.0.1/LICENSE
  // Website: https://octicons.github.com/
  var image = '<?xml version="1.0" encoding="UTF-8"?><svg version="1.1" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="' + color + '" opacity="' + klippyOpacity + '"><path d="m2 13h4v1h-4v-1zm5-6h-5v1h5v-1zm2 3v-2l-3 3 3 3v-2h5v-2h-5zm-4.5-1h-2.5v1h2.5v-1zm-2.5 3h2.5v-1h-2.5v1zm9 1h1v2c-0.02 0.28-0.11 0.52-0.3 0.7s-0.42 0.28-0.7 0.3h-10c-0.55 0-1-0.45-1-1v-11c0-0.55 0.45-1 1-1h3c0-1.11 0.89-2 2-2s2 0.89 2 2h3c0.55 0 1 0.45 1 1v5h-1v-3h-10v9h10v-2zm-9-8h8c0-0.55-0.45-1-1-1h-1c-0.55 0-1-0.45-1-1s-0.45-1-1-1-1 0.45-1 1-0.45 1-1 1h-1c-0.55 0-1 0.45-1 1z"/></g></g></svg>';
  var binaryImage = window.btoa(image);
  var uriImage = 'data:image/svg+xml;base64,' + binaryImage;
  return uriImage;
}

function initKlippy(handSide, headSide, klippyColor, klippyOpacity, tooltipLabel, tooltipLabelSucceed) {
  document.addEventListener("DOMContentLoaded", function() {
    var image = getUriOcticonClippy(klippyColor, klippyOpacity);
    var klippyButton = "<button type='button' class='btn-klippy tooltipped tooltipped-no-delay' aria-label='" + tooltipLabel + "' onfocusout='changeTooltipMessage(this,&quot;" + tooltipLabel + "&quot;)' data-clipboard-klippy><div><img class='octicon' src='"+image+"' alt='Copy'></div></button>";

    // Insert klippy buttons:
    var codeNodeList = document.querySelectorAll(".klippy > code");
    for (var i = 0; i < codeNodeList.length; i += 1) {
      codeNodeList.item(i).insertAdjacentHTML('beforebegin', klippyButton);
    }

    // Auto-size:
    var klippiesCollection = document.getElementsByClassName("btn-klippy");

    function autoSize(klippy) {
      var klippyParent = klippy.parentElement;
      var paddingParent = window.getComputedStyle(klippyParent).getPropertyValue('padding-' + handSide);
      var icon = klippy.querySelector('.octicon');
      icon.style.width = paddingParent;
      icon.style.verticalAlign = headSide;
      if (handSide === 'right') {
        klippy.style.right = '0';
        klippy.className += ' tooltipped-w';
      } else {
        klippy.style.left = '0';
        klippy.className += ' tooltipped-e';
      }
      if (headSide === 'bottom') {
        klippy.style.bottom = '0';
      } else {
        klippy.style.top = '0';
      }
    }

    Array.prototype.map.call(klippiesCollection, autoSize);

    // Initialize clipboard:
    var clipboardKlippies=new Clipboard('[data-clipboard-klippy]',{
      text: function(trigger) {
        return trigger.parentNode.querySelector("code").textContent;
      }
    });

    clipboardKlippies.on('success', function(e) {
      changeTooltipMessage(e.trigger, tooltipLabelSucceed);
      e.clearSelection();
    });

    clipboardKlippies.on('error', function() {
      changeTooltipMessage(e.trigger,'Press Ctrl+C or Command+C to copy');
    });
  });
}

function addKlippy(handSide, headSide, klippyColor, klippyOpacity, tooltipLabel, tooltipLabelSucceed) {
  if(Clipboard.isSupported()) initKlippy(handSide, headSide, klippyColor, klippyOpacity, tooltipLabel, tooltipLabelSucceed);
}
