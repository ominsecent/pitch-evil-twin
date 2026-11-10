(function(){
var FULL="https://airtable.com/appM3nXArS4v2d6vD/pagUlosFm3SBQG09U/form";
var css=".pf{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px 24px;margin-top:32px}.pf .full{grid-column:1/-1}.pf label,.pf legend{display:block;font:500 12px var(--m);letter-spacing:.1em;text-transform:uppercase;margin:0 0 8px;padding:0}.pf label i,.pf legend i{font-style:normal;color:var(--muted);text-transform:none;letter-spacing:0}.pf input[type=text],.pf input[type=email],.pf input[type=url],.pf textarea{width:100%;background:#0d0f14;color:var(--ink);border:2px solid var(--line);border-radius:0;padding:14px;font:16px/1.4 var(--b);transition:border-color .2s,box-shadow .2s}.pf textarea{min-height:170px;resize:vertical}.pf textarea.sm{min-height:84px}.pf input:focus,.pf textarea:focus{outline:0;border-color:var(--ink);box-shadow:4px 4px 0 var(--hot)}.pf fieldset{border:0;margin:0;padding:0;min-width:0}.pf .ks{display:flex;flex-wrap:wrap;gap:8px}.pf .ks label{margin:0;letter-spacing:0;text-transform:none;font:700 16px var(--d);cursor:pointer}.pf .ks input{position:absolute;opacity:0}.pf .ks span{display:block;border:2px solid var(--line);padding:11px 16px;transition:.2s}.pf .ks input:checked+span{background:var(--ink);color:var(--bg);border-color:var(--ink);box-shadow:4px 4px 0 var(--hot)}.pf .ks input:focus-visible+span{border-color:var(--twin)}.pf .ck{display:flex;gap:12px;align-items:flex-start;text-transform:none;letter-spacing:0;font:15px/1.45 var(--b);color:var(--muted);cursor:pointer}.pf .ck input{width:20px;height:20px;margin:1px 0 0;accent-color:var(--hot);flex:none}.pf .kx{border-left:3px solid var(--hot);padding-left:20px}.pf .kh{font:600 13px var(--m);letter-spacing:.12em;text-transform:uppercase;margin:0 0 16px}.pf .kh i{font-style:normal;color:var(--muted);text-transform:none;letter-spacing:0;font-weight:400}.pf .kg{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px 24px}@media(max-width:760px){.pf .kg{grid-template-columns:minmax(0,1fr)}}.pf .dz{border:2px dashed var(--line);padding:16px;display:flex;flex-direction:column;gap:10px}.pf .dz input{font:15px var(--b);color:var(--ink);max-width:100%}.pf .dz input::file-selector-button{font:700 15px var(--d);background:transparent;color:var(--ink);border:2px solid var(--ink);padding:8px 14px;margin-right:14px;cursor:pointer}.pf .dn{margin:0;font-size:14px;color:var(--muted)}.pf .hp{position:absolute;left:-9999px}.pf .go{display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center}.pf button.btn{cursor:pointer}.pf button[disabled]{opacity:.6;cursor:progress}.pf .msg{font:500 15px var(--b);color:var(--hot);margin:0}.pf .alt{font-size:14px;color:var(--muted);margin:0}.done{margin-top:28px;border:2px solid var(--ink);padding:28px;box-shadow:8px 8px 0 var(--hot),-6px -6px 0 var(--twin)}.done h3{font:800 clamp(28px,5vw,48px)/1 var(--d);margin:0 0 12px;letter-spacing:-.02em}.done p{margin:0;max-width:52ch;font-size:18px;color:var(--ink)}@media(max-width:760px){.pf{grid-template-columns:minmax(0,1fr)}}";
function h(t,a,k){var e=document.createElement(t);for(var n in a)e.setAttribute(n,a[n]);(k||[]).forEach(function(c){e.append(c)});return e}
function fld(id,label,opt,el,full){var l=h("label",{for:id},[label]);if(opt)l.append(" ",h("i",{},["optional"]));return h("div",full?{class:"full"}:{},[l,el])}
function init(){
var sec=document.querySelector(".cta");if(!sec)return;
document.head.append(h("style",{},[css]));
sec.id="pitch";sec.style.display="block";
var old=sec.querySelector("a.btn");if(old)old.remove();
var p=sec.querySelector("p");if(p)p.textContent="Six short questions. Attach your deck as a PDF and paste links to a demo or a 60-second video. You get a confirmation by email with a ticket number.";
document.querySelectorAll("a.btn").forEach(function(a){a.setAttribute("href","#pitch")});
var ks=h("div",{class:"ks"},["Startup","Fund","Co-invest","Secondary"].map(function(k,i){var inp=h("input",{type:"radio",name:"kind",value:k});if(!i)inp.checked=true;return h("label",{},[inp,h("span",{},[k])])}));
var KF={Startup:[["raising","How much are you raising?"],["investors","Existing investors"]],
Fund:[["size","Target fund size"],["close","Next close date"],["gpc","GP commit"],["lps","Anchor or existing LPs"],["strategy","Strategy: stage, sector, check size, number of companies",1],["track","Track record: prior funds or deals, DPI, TVPI, notable outcomes",1]],
"Co-invest":[["company","Company"],["round","Round and lead investor"],["alloc","Allocation available"],["terms","Valuation or terms"],["deadline","Deadline to commit"]],
Secondary:[["company","Company"],["seller","Who is selling: founder, employee, fund or LP stake"],["block","Size of the block"],["price","Price, or discount to the last round"],["rofr","Transfer restrictions or ROFR"]]};
var kbox=h("div",{class:"kx full"});
function drawKind(){var k=(document.querySelector(".ks input:checked")||{}).value||"Startup";kbox.textContent="";kbox.append(h("p",{class:"kh"},[k+" details ",h("i",{},["optional, but they get you a sharper reply"])]));var g=h("div",{class:"kg"});(KF[k]||[]).forEach(function(f){var id="pf-x-"+f[0];var el=f[2]?h("textarea",{id:id,"data-x":f[0],class:"sm"}):h("input",{id:id,"data-x":f[0],type:"text"});g.append(h("div",f[2]?{class:"full"}:{},[h("label",{for:id},[f[1]]),el]))});kbox.append(g)}
var deck={name:"",text:""};
var PDFB=window.PDFJS_BASE||"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
var dnote=h("p",{class:"dn",role:"status"},["PDF only, up to 25 MB. We read the text so your deck counts toward your reply."]);
var dinp=h("input",{type:"file",id:"pf-deck",accept:"application/pdf,.pdf"});
var dbox=h("div",{class:"full"},[h("label",{for:"pf-deck"},["Deck ",h("i",{},["optional"])]),h("div",{class:"dz"},[dinp,dnote])]);
function loadPdf(){return new Promise(function(ok,no){if(window.pdfjsLib)return ok(window.pdfjsLib);var sc=document.createElement("script");sc.src=PDFB+"pdf.min.js";sc.onload=function(){try{window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFB+"pdf.worker.min.js";ok(window.pdfjsLib)}catch(e){no(e)}};sc.onerror=function(){no(new Error("load"))};document.head.appendChild(sc)})}
dinp.addEventListener("change",function(){deck={name:"",text:""};var fl=dinp.files&&dinp.files[0];if(!fl){dnote.textContent="PDF only, up to 25 MB. We read the text so your deck counts toward your reply.";return}
if(!/\.pdf$/i.test(fl.name)&&fl.type!=="application/pdf"){dnote.textContent="That isn't a PDF. Export your deck to PDF, or paste a link below.";dinp.value="";return}
if(fl.size>25*1024*1024){dnote.textContent="That file is over 25 MB. Paste a link below instead.";dinp.value="";return}
dnote.textContent="Reading "+fl.name+"\u2026";
fl.arrayBuffer().then(function(buf){return loadPdf().then(function(lib){return lib.getDocument({data:buf}).promise})}).then(function(doc){var n=Math.min(doc.numPages,40),out=[],i=1;
function next(){if(i>n||out.join("").length>20000)return Promise.resolve();return doc.getPage(i).then(function(pg){return pg.getTextContent()}).then(function(tc){out.push("[Slide "+i+"] "+tc.items.map(function(t){return t.str}).join(" ").replace(/\s+/g," ").trim());i++;return next()})}
return next().then(function(){var txt=out.join("\n").slice(0,20000);var real=txt.replace(/\[Slide \d+\]/g,"").replace(/\s/g,"").length;
if(real<80){deck={name:fl.name+" (no readable text)",text:""};dnote.textContent="We couldn't read text from "+fl.name+" (it may be images only). Paste a link below as well so we can open it."}
else{deck={name:fl.name+" ("+(i-1)+" of "+doc.numPages+" pages read)",text:txt};dnote.textContent="Attached: "+fl.name+", "+(i-1)+" page"+(i-1===1?"":"s")+" read."}})})
.catch(function(){deck={name:"",text:""};dnote.textContent="We couldn't open that file. Paste a link below instead."})});
var msg=h("p",{class:"msg",role:"alert"});
var btn=h("button",{class:"btn",type:"submit"},["Send pitch ",h("i",{"aria-hidden":"true"},["→"])]);
var f=h("form",{class:"pf",novalidate:""},[
fld("pf-name","Your name",0,h("input",{id:"pf-name",name:"name",type:"text",autocomplete:"name",required:""})),
fld("pf-email","Email",0,h("input",{id:"pf-email",name:"email",type:"email",autocomplete:"email",required:""})),
fld("pf-co","Company or fund name",0,h("input",{id:"pf-co",name:"company",type:"text",autocomplete:"organization",required:""})),
h("fieldset",{},[h("legend",{},["You are pitching a"]),ks]),
kbox,
fld("pf-one","What it does, in one line",0,h("input",{id:"pf-one",name:"oneLiner",type:"text",maxlength:"300",required:""}),1),
fld("pf-pitch","Your pitch",0,h("textarea",{id:"pf-pitch",name:"pitch",required:"",placeholder:"What you are building, who needs it, and what is working so far. Paste from your deck or memo if that is easier."}),1),
dbox,
fld("pf-links","Links",1,h("textarea",{id:"pf-links",name:"links",class:"sm",placeholder:"Demo, data room, video or site. One per line."}),1),
fld("pf-li","LinkedIn profile",1,h("input",{id:"pf-li",name:"linkedin",type:"url",placeholder:"https://"})),
fld("pf-src","How did you find this page?",1,h("input",{id:"pf-src",name:"source",type:"text"})),
h("label",{class:"ck full"},[h("input",{type:"checkbox",name:"share"}),h("span",{},["If my pitch isn't right for Evil Twin Capital, you have my permission to forward it to other investors in your network."])]),
h("div",{class:"hp","aria-hidden":"true"},[h("input",{type:"text",name:"website",tabindex:"-1",autocomplete:"off"})]),
h("div",{class:"go full"},[btn,msg]),
h("p",{class:"alt full"},["Need to attach video or other files? ",h("a",{href:FULL,target:"_blank",rel:"noopener"},["Use the full form"]),"."])
]);
sec.append(f);
drawKind();ks.addEventListener("change",drawKind);
try{var fr=new URLSearchParams(location.search).get("from");if(fr)f.elements.source.value=fr.slice(0,60)}catch(e){}
f.addEventListener("submit",function(e){e.preventDefault();msg.textContent="";
var d={};new FormData(f).forEach(function(v,k){d[k]=typeof v==="string"?v.trim():v});d.share=f.elements.share.checked;d.deckName=deck.name;d.deckText=deck.text;delete d["pf-deck"];d.extra={};kbox.querySelectorAll("[data-x]").forEach(function(e){var v=e.value.trim();if(v)d.extra[e.getAttribute("data-x")]=v});
var need={name:"your name",email:"your email",company:"a company or fund name",oneLiner:"the one-line description",pitch:"your pitch"};
for(var k in need){if(!d[k]){msg.textContent="Add "+need[k]+" to send.";f.elements[k].focus();return}}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)){msg.textContent="That email address doesn't look right.";f.elements.email.focus();return}
btn.disabled=true;btn.firstChild.textContent="Sending… ";
fetch("/api/pitch",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||!j.ok)throw new Error(j.error||"We couldn't send your pitch. Please try again.");})}).then(function(){
var done=h("div",{class:"done",role:"status",tabindex:"-1"},[h("h3",{},["Pitch received. 🤙"]),h("p",{},["It’s in front of both twins now. You’ll get a confirmation email with your ticket number, and a straight answer from us after that."])]);
f.replaceWith(done);done.focus();done.scrollIntoView({block:"center",behavior:"smooth"});
}).catch(function(err){btn.disabled=false;btn.firstChild.textContent="Send pitch ";msg.textContent=err.message});
});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
