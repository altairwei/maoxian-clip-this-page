
(function() {
  'use strict';

  // flag
  // FIXME if need
  const FLAG = 'clipThisPage=1';

  // FIXME if need
  const TITLE = document.title;
  const CATEGORY = "test/auto-clip";
  const TAGSTR = "test, auto-clip";

  function listenCompletedMsg() {
    MxWc.onClipCompleted(function(detail){
      // Latest chrome (start in version 73.0.3666.0) will restrict cors request in content script
      // avoid it.
      sendMessageToBackground({
        type: 'clipComplete',
        detail: {
          url: window.location.href,
          filename: detail.filename,
          completedAt: detail.completedAt
        }
      });
    });
  }

  function sendMessageToBackground(message) {
    return browser.runtime.sendMessage(message)
  }

  function clipNow() {
    // 裁剪 body 标签的内容
    // FIXME if need
    const rules = ['C||*||/||body'];

    // 这是裁剪时候填写到表单的三个信息
    const formInputs = {
      title: TITLE,
      category: CATEGORY,
      tagstr: TAGSTR
    }

    const cmd = MxWc.newClipCmd(formInputs);

    // 该语句运行后就会很快进行裁剪
    cmd.init(rules);
  }

  function dealPage() {
    // 有些页面可能需要在裁剪之前做些额外的操作
    // FIXME if need
  }


  function init(){
    const search = window.location.search;
    if(search.indexOf(FLAG) > -1) {
      dealPage();
      listenCompletedMsg();
      clipNow();
    } else {
      // Do nothing.
    }
    console.log("maoxian clip this page");
  }

  init();

})();
