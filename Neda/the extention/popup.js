// تشغيل الكود الأول عند الضغط على الزر الأول
document.getElementById('runCode1').addEventListener('click', async () => {
    const tab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {


            function scrollToBottomAndTop() {
                // النزول إلى أسفل الصفحة
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth' // التمرير بسلاسة
                });
            
                // التحقق من الوصول إلى نهاية الصفحة
                setTimeout(() => {
                    // العودة إلى أعلى الصفحة بعد 3 ثواني
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth' // التمرير بسلاسة
                    });
                }, 3000); // تأخير 3 ثوانٍ قبل العودة للأعلى
            }
            scrollToBottomAndTop();
            
            
            
            // تعريف الـ array الذي يحتوي على المستخدمين
            let users = document.querySelectorAll('[data-testid="primaryColumn"] > .css-175oi2r > .css-175oi2r:nth-child(3) > .css-175oi2r > div > div div.r-172uzmj');
            
            // دالة لمحاكاة الـ hover
            function hoverElement(element) {
                let event = new MouseEvent('mouseover', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(event);
            }
            
            // تنفيذ العملية على جميع المستخدمين في الـ array
            async function processUsers(users) {
                for (let i = 0; i < users.length; i++) {
                    hoverElement(users[i]); // عمل hover على الـ user الحالي
                    await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير بسيط للتأكد من تنفيذ الـ hover

                }
            
                // بعد الانتهاء من جميع المستخدمين، يتم استدعاء الفنكشن الجديدة
                processFollowButtons();
            }
            
            // الفنكشن الجديدة التي تضغط على الأزرار
            function processFollowButtons() {
                let btns = document.querySelectorAll('#layers > div.css-175oi2r.r-zchlnj.r-1d2f490.r-u8s1d.r-ipm5af.r-1p0dtai.r-105ug2t > div > div > div > div > div > div > div > div > div:nth-child(1) > div:nth-child(2) > button > div > span > span');
                
                var i = 0;
                let interval = setInterval(() => {
                    if (i >= btns.length) {
                        clearInterval(interval); // إيقاف الفنكشن عند انتهاء الأزرار
                        return;
                    }
            
                    var btn = btns[i];
                    btn.click(); // الضغط على الزر الحالي
                    i++;
                }, 1000); // تأخير بين كل عملية ضغط
            }
            
            // بدء العملية
            processUsers(users);
            
            
            
            
        }
    });
});

// تشغيل الكود الثاني عند الضغط على الزر الثاني
document.getElementById('runCode2').addEventListener('click', async () => {
    const tab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {

            
            (() => {
                const $followButtons = '[data-testid$="-unfollow"]';
                const $confirmButton = '[data-testid="confirmationSheetConfirm"]';
              
                const retry = {
                  count: 0,
                  limit: 3,
                };
              
                const scrollToTheBottom = () => window.scrollTo(0, document.body.scrollHeight);
                const retryLimitReached = () => retry.count === retry.limit;
                const addNewRetry = () => retry.count++;
              
                const sleep = ({ seconds }) =>
                  new Promise((proceed) => {
                    console.log(`WAITING FOR ${seconds} SECONDS...`);
                    setTimeout(proceed, seconds * 5000);
                  });
              
                const unfollowAll = async (followButtons) => {
                  console.log(`UNFOLLOWING ${followButtons.length} USERS...`);
                  await Promise.all(
                    followButtons.map(async (followButton) => {
                      followButton && followButton.click();
                      await sleep({ seconds: 1 });
                      const confirmButton = document.querySelector($confirmButton);
                      confirmButton && confirmButton.click();
                    })
                  );
                };
              
                const nextBatch = async () => {
                  scrollToTheBottom();
                  await sleep({ seconds: 1 });
              
                  let followButtons = Array.from(document.querySelectorAll($followButtons));
                  followButtons = followButtons.filter(b => b.parentElement?.parentElement?.querySelector('[data-testid="userFollowIndicator"]') === null)
                  const followButtonsWereFound = followButtons.length > 0;
              
                  if (followButtonsWereFound) {
                    await unfollowAll(followButtons);
                    await sleep({ seconds: 2 });
                    return nextBatch();
                  } else {
                    addNewRetry();
                  }
              
                  if (retryLimitReached()) {
                    console.log(`NO ACCOUNTS FOUND, SO I THINK WE'RE DONE`);
                    console.log(`RELOAD PAGE AND RE-RUN SCRIPT IF ANY WERE MISSED`);
                  } else {
                    await sleep({ seconds: 2 });
                    return nextBatch();
                  }
                };
              
                nextBatch();
              })();
              
        }
    });
});

// تشغيل الكود الثالث عند الضغط على الزر الثالث
document.getElementById('runCode3').addEventListener('click', async () => {
    const tab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
          let btns = document.querySelectorAll("button[aria-label*='Follow @']")


          var i = 0
          setInterval(() => {
          
              var btn = btns[i]
              btn.click();
              i++
          }, 3000);
          
          
        }
    });
});

// دالة للحصول على التبويب النشط الحالي
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
