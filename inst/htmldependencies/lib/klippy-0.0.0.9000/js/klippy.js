function addClassKlippyToPreCode() {
  $(document).ready(function() {
    $("pre > code").parent().addClass("klippy");
  });
}

function addClassKlippyTo(selector) {
  $(document).ready(function() {
    $(selector).addClass("klippy");
  });
}

function changeTooltipMessage(element,msg) {
  var tooltipOriginalTitle=element.getAttribute('data-original-title');
  element.setAttribute('data-original-title',msg);
  $(element).tooltip('show');
  element.setAttribute('data-original-title',tooltipOriginalTitle);
}

function initKlippy() {
  $(document).ready(function() {
    // Add klippy buttons:
    $("<button type='button' class='btn btn-default btn-sm btn-klippy' title='Copy to clipboard' data-toggle='tooltip' data-placement='right auto' data-trigger='hover' data-clipboard-klippy><span class='glyphicon glyphicon-copy' aria-hidden='true'></span></button>").insertBefore($(".klippy > code"));

    // Initialize tooltips:
    $('.btn-klippy').each(function(index){
      $this=$(this);
      // In some HTML documents (e.g. HTML vignettes),
      // <pre><code></code></pre> element is embedded in a <div> element
      if ($this.parent().is(':first-child')) {
        $this.parent().parent().addClass("klippy").attr("data-klippy-id", index);
      // otherwise:
      } else {
        $this.parent().attr("data-klippy-id", index);
      }
      var selectCSS='[data-klippy-id="'+index+'"]';
      $this.tooltip({
          container: selectCSS
      });
    });

    // Initialize clipboard:
    var clipboardKlippies=new Clipboard('[data-clipboard-klippy]',{
      text: function(trigger) {
        return trigger.parentNode.querySelector("code").textContent;
      }
    });

    clipboardKlippies.on('success',function(e){
      // For debugging:
      //console.info('Action:', e.action);
      //console.info('Text:', e.text);
      //console.info('Trigger:', e.trigger);
      changeTooltipMessage(e.trigger,'Copied!');
      e.clearSelection();
    });

    clipboardKlippies.on('error',function(){
      // For debugging:
      //console.error('Error during copying');
      changeTooltipMessage(e.trigger,'Press Ctrl+C or Command+C to copy');
    });
  });
}

function addKlippy() {
  if(Clipboard.isSupported()) initKlippy();
}


