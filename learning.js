'use strict';
const learningLevels=document.querySelectorAll('[data-level]');
learningLevels.forEach(button=>button.addEventListener('click',()=>{
 const deep=button.dataset.level==='deep';
 document.body.dataset.level=deep?'deep':'easy';
 learningLevels.forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button))});
 document.querySelectorAll('.deeper,.advanced-controls').forEach(d=>d.open=deep);
 document.getElementById('levelHint').textContent=deep?'원리와 공정한 비교 방법까지 알아봐요.':'짧은 설명과 작은 미션으로 시작해요.';
}));
const photoDialog=document.getElementById('photoDialog');
document.querySelectorAll('.photo-open').forEach(button=>button.addEventListener('click',()=>{
 document.getElementById('photoLarge').src=button.dataset.photo;
 document.getElementById('photoLarge').alt=button.dataset.caption;
 document.getElementById('photoCaption').textContent=button.dataset.caption;
 photoDialog.showModal();
}));
document.getElementById('photoClose').onclick=()=>photoDialog.close();
document.querySelectorAll('[data-mission]').forEach(button=>button.addEventListener('click',()=>{
 // Keep all conditions identical except the selected teaching variable.
 document.querySelector('#typeGroup [data-type="tetra"]').click();
 document.querySelector('#positionGroup [data-gap="0"]').click();
 document.getElementById('period').value='1.4';
 document.getElementById('porosity').value='50';
 const strength=document.getElementById('strength');
 strength.value=button.dataset.mission==='strong'?'75':'35';
 ['period','porosity','strength'].forEach(id=>document.getElementById(id).dispatchEvent(new Event('input')));
 if(button.dataset.mission==='gap')document.querySelector('#positionGroup [data-gap="3"]').click();
 document.getElementById('missionTitle').textContent=button.dataset.mission==='gap'?'놓는 위치를 바꾸었어요':'흔드는 세기를 바꾸었어요';
 document.getElementById('missionText').textContent=button.dataset.mission==='gap'?'기본 배치와 같은 35% 세기로 시작해요. 같은 시간에서 멈추고 기록해 보세요.':'자동 흔들기가 시작되었어요. 물결을 보고 멈춘 뒤, 같은 시간의 다른 세기와 비교해 보세요.';
 document.getElementById('run').click();
 document.querySelectorAll('[data-mission]').forEach(b=>b.classList.toggle('selected',b===button));
}));
document.querySelectorAll('[data-predict]').forEach(button=>button.onclick=()=>{
 document.querySelectorAll('[data-predict]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.getElementById('predictionFeedback').textContent='예상했네요! 아래의 “3 cm 떨어뜨리기”를 눌러 실제 기록과 비교해 보세요. 예상과 달라도 좋은 발견이에요.';
});
const scores=new Set();
document.querySelectorAll('.mini-quiz').forEach(quiz=>quiz.querySelectorAll('button').forEach(button=>button.onclick=()=>{
 const correct=button.dataset.correct==='true';
 quiz.querySelectorAll('button').forEach(b=>{b.classList.toggle('chosen',b===button);b.setAttribute('aria-pressed',String(b===button))});
 if(correct)scores.add(quiz.dataset.key);else scores.delete(quiz.dataset.key);
 const explanations={measured:'모눈종이가 젖은 칸 수를 비교했어요. 물의 부피나 전기량을 직접 잰 실험은 아니에요.',five:'왕복은 갔다가 돌아오는 움직임이에요. 이 움직임을 다섯 번 했다는 뜻이에요.'};
 quiz.querySelector('.feedback').textContent=(correct?'맞아요! ':'한 번 더 생각해 볼까요? ')+explanations[quiz.dataset.key];
 document.getElementById('checkScore').textContent=`맞힌 문제 ${scores.size} / 2`;
}));
document.getElementById('quizReset').onclick=()=>{
 scores.clear();document.getElementById('checkScore').textContent='맞힌 문제 0 / 2';
 document.querySelectorAll('.mini-quiz button').forEach(b=>{b.classList.remove('chosen');b.removeAttribute('aria-pressed')});
 document.querySelectorAll('.mini-quiz .feedback').forEach(p=>p.textContent='하나를 골라 보세요.');
};
const promptDialog=document.getElementById('promptDialog');
document.getElementById('promptOpen').onclick=async()=>{
 promptDialog.showModal();
 if(!document.getElementById('promptText').value){
  try{const r=await fetch('interactive-magazine-prompt.txt');if(!r.ok)throw Error();document.getElementById('promptText').value=await r.text()}
  catch{document.getElementById('copyStatus').textContent='불러오지 못했어요. 텍스트로 받기를 눌러 주세요.'}
 }
};
document.getElementById('promptClose').onclick=()=>promptDialog.close();
document.getElementById('copyPrompt').onclick=async()=>{
 const el=document.getElementById('promptText');if(!el.value)return;
 try{await navigator.clipboard.writeText(el.value);document.getElementById('copyStatus').textContent='전체 프롬프트를 복사했어요.'}
 catch{el.focus();el.select();document.getElementById('copyStatus').textContent='텍스트를 선택했어요. 기기의 복사 기능을 사용해 주세요.'}
};
