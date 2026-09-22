async function getAuthLogic() {
  const res = await fetch('https://ke.thebar.com/js/app.631d23b8.js');
  const js = await res.text();

  const pos = js.indexOf('Signature:l');
  if (pos !== -1) {
    console.log(js.substring(Math.max(0, pos - 1500), pos + 500));
  }
}
getAuthLogic();
