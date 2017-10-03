function addClassCopyContainerToExamples() {
  $(document).ready(function() {
    $(".examples").addClass("copy-container");
  });
}

function changeTooltipMessage(element, msg) {
  var tooltipOriginalTitle=element.getAttribute('data-original-title');
  element.setAttribute('data-original-title',msg);
  $(element).tooltip('show');
  element.setAttribute('data-original-title', tooltipOriginalTitle);
}

function initCopyButtons() {
  $(document).ready(function() {
    var copyButton = "<button type='button' class='btn btn-link btn-xs btn-copy-ex' title='Copy to clipboard' aria-hidden='true' data-toggle='tooltip' data-placement='right auto' data-trigger='hover' data-clipboard-copy><i class='fa fa-files-o copy-icon' aria-hidden='true'></i></button>";

    // Insert copy buttons:
    //$(".copy-container").prepend(copyButton);
    $('.copy-container').before(copyButton);


    $('.btn-copy-ex').each(function(index) {
      $this=$(this);
      // Auto-size fa icons:
      //var containerPadding=$this.parent().css('padding-left');
      //$this.children(".fa-fw").attr('width', containerPadding+'!important');
      // Initialize tooltips:
      $this.tooltip({
          container: 'body'
      });
    });

    // Initialize clipboard:
    var clipboardBtnCopies = new Clipboard('[data-clipboard-copy]', {
      text: function(trigger) {
        return trigger.nextSibling.textContent;
      }
    });

    clipboardBtnCopies.on('success', function(e) {
      // For debugging:
      //console.info('Action:', e.action);
      //console.info('Text:', e.text);
      //console.info('Trigger:', e.trigger);
      changeTooltipMessage(e.trigger, 'Copied!');
      e.clearSelection();
    });

    clipboardBtnCopies.on('error', function() {
      // For debugging:
      //console.error('Error during copying');
      changeTooltipMessage(e.trigger,'Press Ctrl+C or Command+C to copy');
    });
  });
}

function addCopyButtons() {
  if(Clipboard.isSupported()) initCopyButtons();
}

addClassCopyContainerToExamples();
addCopyButtons();
