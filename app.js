const common = 'Olá, Garra Marmoraria! Encontrei vocês pelo site e gostaria de conversar sobre um projeto em pedra.';
const whatsapp = text => `https://wa.me/5565992785086?text=${encodeURIComponent(text)}`;
document.querySelectorAll('.whatsapp').forEach(a => {a.href=whatsapp(common); a.target='_blank'; a.rel='noopener';});
const menu=document.querySelector('.menu'), nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
const dialog=document.getElementById('lightbox'), large=document.getElementById('large-image');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{large.src=button.dataset.image;large.alt=button.querySelector('img').alt;dialog.showModal();}));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const steps=[
{key:'tipo',title:'O que você deseja fazer?',options:['Bancada','Pia ou lavatório','Soleira ou peitoril','Escada','Revestimento','Outro']},
{key:'ambiente',title:'Qual ambiente receberá o trabalho?',options:['Cozinha','Banheiro','Área externa','Área comercial','Outro']},
{key:'material',title:'Você já escolheu o material?',options:['Mármore','Granito','Ardósia','Ainda não escolhi','Outro']},
{key:'medidas',title:'Você possui medidas aproximadas?',options:['Sim','Não','Tenho planta ou desenho']},
{key:'local',title:'Onde fica o imóvel?',hint:'Informe a cidade e o bairro.',placeholder:'Ex.: Cuiabá, Jardim Vitória',autocomplete:'off'},
{key:'nome',title:'Qual é o seu nome?',hint:'Campo obrigatório.',placeholder:'Seu nome',autocomplete:'given-name'},
{key:'detalhes',title:'Detalhes adicionais',hint:'Opcional. Inclua medidas, cores desejadas e observações.',placeholder:'Conte um pouco mais sobre seu projeto…',optional:true}
];
const answers={};let step=0;const form=document.getElementById('quote-form'),question=document.getElementById('question'),error=document.getElementById('error'),back=document.getElementById('back'),next=document.getElementById('next'),send=document.getElementById('send');
function save(){const s=steps[step];const field=s.options?form.querySelector('input:checked'):document.getElementById('answer');answers[s.key]=field?field.value.trim():'';}
function message(){return `Olá, Garra Marmoraria! Meu nome é ${answers.nome} e gostaria de solicitar uma avaliação para um projeto.\n\nTipo de trabalho: ${answers.tipo}\nAmbiente: ${answers.ambiente}\nMaterial desejado: ${answers.material}\nMedidas disponíveis: ${answers.medidas}\nLocalização: ${answers.local}\nDetalhes: ${answers.detalhes||'Não informado'}\n\nEncontrei vocês pelo site. Se necessário, também posso enviar fotos, medidas ou a planta pelo WhatsApp.`;}
function prepareSend(){save();send.href=whatsapp(message());}
function render(focus=false){const s=steps[step];question.replaceChildren();error.textContent='';document.getElementById('step-label').textContent=`Etapa ${step+1} de 7`;document.getElementById('progress').value=step+1;back.hidden=step===0;next.hidden=step===6;send.hidden=step!==6;document.getElementById('send-note').hidden=step!==6;
if(s.options){const set=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=s.title;legend.tabIndex=-1;set.append(legend);const list=document.createElement('div');list.className='options';s.options.forEach(value=>{const label=document.createElement('label');label.className='option';const input=document.createElement('input');input.type='radio';input.name=s.key;input.value=value;input.checked=answers[s.key]===value;input.setAttribute('aria-describedby','error');label.append(input,document.createTextNode(value));list.append(label);});set.append(list);question.append(set);}else{const label=document.createElement('label');label.className='field-label';label.htmlFor='answer';label.textContent=s.title;const input=document.createElement(s.optional?'textarea':'input');if(!s.optional)input.type='text';input.id='answer';input.name=s.key;input.maxLength=s.optional?1500:120;input.required=!s.optional;input.placeholder=s.placeholder;input.value=answers[s.key]||'';input.autocomplete=s.autocomplete||'off';input.setAttribute('aria-describedby','field-help error');const hint=document.createElement('p');hint.id='field-help';hint.className='field-help';hint.textContent=s.hint;question.append(label,input,hint);}
if(step===6)prepareSend();if(focus)(question.querySelector('legend')||question.querySelector('input,textarea')).focus();}
form.addEventListener('submit',e=>{e.preventDefault();save();const s=steps[step];if(!s.optional&&!answers[s.key]){error.textContent=s.options?'Selecione uma opção para continuar.':'Preencha este campo para continuar.';const field=question.querySelector('input,textarea');field.setAttribute('aria-invalid','true');field.focus();return;}if(step<6){step++;render(true);}});
back.addEventListener('click',()=>{save();if(step>0){step--;render(true);}});
form.addEventListener('input',()=>{save();error.textContent='';question.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));if(step===6)prepareSend();});send.addEventListener('click',prepareSend);render();
document.getElementById('year').textContent=new Date().getFullYear();
const floating=document.querySelector('.floating');const hideTargets=[document.getElementById('orcamento'),document.querySelector('footer')];const visible=new Set();new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));floating.classList.toggle('hidden',visible.size>0);},{threshold:0}).observe(hideTargets[0]);new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));floating.classList.toggle('hidden',visible.size>0);},{threshold:0}).observe(hideTargets[1]);
