(function(){
var FULL="https://airtable.com/appM3nXArS4v2d6vD/pagUlosFm3SBQG09U/form";
var css=".pf{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px 24px;margin-top:32px}.pf .full{grid-column:1/-1}.pf label,.pf legend{display:block;font:500 12px var(--m);letter-spacing:.1em;text-transform:uppercase;margin:0 0 8px;padding:0}.pf label i,.pf legend i{font-style:normal;color:var(--muted);text-transform:none;letter-spacing:0}.pf input[type=text],.pf input[type=email],.pf input[type=url],.pf textarea{width:100%;background:#0d0f14;color:var(--ink);border:2px solid var(--line);border-radius:0;padding:14px;font:16px/1.4 var(--b);transition:border-color .2s,box-shadow .2s}.pf textarea{min-height:170px;resize:vertical}.pf textarea.sm{min-height:84px}.pf input:focus,.pf textarea:focus{outline:0;border-color:var(--ink);box-shadow:4px 4px 0 var(--hot)}.pf fieldset{border:0;margin:0;padding:0;min-width:0}.pf .ks{display:flex;flex-wrap:wrap;gap:8px}.pf .ks label{margin:0;letter-spacing:0;text-transform:none;font:700 16px var(--d);cursor:pointer}.pf .ks input{position:absolute;opacity:0}.pf .ks span{display:block;border:2px solid var(--line);padding:11px 16px;transition:.2s}.pf .ks input:checked+span{background:var(--ink);color:var(--bg);border-color:var(--ink);box-shadow:4px 4px 0 var(--hot)}.pf .ks input:focus-visible+span{border-color:var(--twin)}.pf .ck{display:flex;gap:12px;align-items:flex-start;text-transform:none;letter-spacing:0;font:15px/1.45 var(--b);color:var(--muted);cursor:pointer}.pf .ck input{width:20px;height:20px;margin:1px 0 0;accent-color:var(--hot);flex:none}.pf .hp{position:absolute;left:-9999px}.pf .go{display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center}.pf button.btn{cursor:pointer}.pf button[disabled]{opacity:.6;cursor:progress}.pf .msg{font:500 15px var(--b);color:var(--hot);margin:0}.pf .alt{font-size:14px;color:var(--muted);margin:0}.done{margin-top:28px;border:2px solid var(--ink);padding:28px;box-shadow:8px 8px 0 var(--hot),-6px -6px 0 var(--twin)}.done h3{font:800 clamp(28px,5vw,48px)/1 var(--d);margin:0 0 12px;letter-spacing:-.02em}.done p{margin:0;max-width:52ch;font-size:18px;color:var(--ink)}@media(max-width:760px){.pf{grid-template-columns:minmax(0,1fr)}}";
function h(t,a,k){var e=document.createElement(t);for(var n in a)e.setAttribute(n,a[n]);(k||[]).forEach(function(c){e.append(c)});return e}
function fld(id,label,opt,el,full){var l=h("label",{for:id},[label]);if(opt)l.append(" ",h("i",{},["optional"]));return h("div",full?{class:"full"}:{},[l,el])}
function init(){
var sec=document.querySelector(".cta");if(!sec)return;
document.head.append(h("style",{},[css]));
sec.id="pitch";sec.style.display="block";
var old=sec.querySelector("a.btn");if(old)old.remove();
var p=sec.querySelector("p");if(p)p.textContent="Six short questions. Paste links to your deck, demo or a 60-second video. You get a confirmation by email with a ticket number.";
document.querySelectorAll("a.btn").forEach(function(a){a.setAttribute("href","#pitch")});
var ks=h("div",{class:"ks"},["Startup","Fund","Co-invest","Secondary"].map(function(k,i){var inp=h("input",{type:"radio",name:"kind",value:k});if(!i)inp.checked=true;return h("label",{},[inp,h("span",{},[k])])}));
var msg=h("p",{class:"msg",role:"alert"});
var btn=h("button",{class:"btn",type:"submit"},["Send pitch ",h("i",{"aria-hidden":"true"},["→"])]);
var f=h("form",{class:"pf",novalidate:""},[
fld("pf-name","Your name",0,h("input",{id:"pf-name",name:"name",type:"text",autocomplete:"name",required:""})),
fld("pf-email","Email",0,h("input",{id:"pf-email",name:"email",type:"email",autocomplete:"email",required:""})),
fld("pf-co","Company or fund name",0,h("input",{id:"pf-co",name:"company",type:"text",autocomplete:"organization",required:""})),
h("fieldset",{},[h("legend",{},["You are pitching a"]),ks]),
fld("pf-one","What it does, in one line",0,h("input",{id:"pf-one",name:"oneLiner",type:"text",maxlength:"300",required:""}),1),
fld("pf-pitch","Your pitch",0,h("textarea",{id:"pf-pitch",name:"pitch",required:"",placeholder:"What you are building, who needs it, and what is working so far. Paste from your deck or memo if that is easier."}),1),
fld("pf-links","Links",1,h("textarea",{id:"pf-links",name:"links",class:"sm",placeholder:"Deck, demo, data room, video or site. One per line."}),1),
fld("pf-li","LinkedIn profile",1,h("input",{id:"pf-li",name:"linkedin",type:"url",placeholder:"https://"})),
fld("pf-src","How did you find this page?",1,h("input",{id:"pf-src",name:"source",type:"text"})),
h("label",{class:"ck full"},[h("input",{type:"checkbox",name:"share"}),h("span",{},["If my pitch isn't right for Evil Twin Capital, you have my permission to forward it to other investors in your network."])]),
h("div",{class:"hp","aria-hidden":"true"},[h("input",{type:"text",name:"website",tabindex:"-1",autocomplete:"off"})]),
h("div",{class:"go full"},[btn,msg]),
h("p",{class:"alt full"},["Need to attach files, or add fund, co-invest or secondary details? ",h("a",{href:FULL,target:"_blank",rel:"noopener"},["Use the full form"]),"."])
]);
sec.append(f);
f.addEventListener("submit",function(e){e.preventDefault();msg.textContent="";
var d={};new FormData(f).forEach(function(v,k){d[k]=typeof v==="string"?v.trim():v});d.share=f.elements.share.checked;
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
