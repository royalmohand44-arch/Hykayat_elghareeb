import {storage} from '../core/storage.js';

export function initTheme(){
  const root=document.documentElement;
  const button=document.querySelector('[data-theme-toggle]');
  const enabled=storage.get('gold-lumen',false)===true;

  // The new visual identity is intentionally anchored to a permanent
  // obsidian-and-gold palette. This control changes the gold lighting,
  // rather than switching the whole site to an unrelated light theme.
  root.dataset.theme='dark';
  root.classList.toggle('gold-lumen',enabled);
  button?.setAttribute('aria-pressed',String(enabled));
  button?.setAttribute('aria-label',enabled?'إيقاف الوهج الذهبي':'تفعيل الوهج الذهبي');
  button?.setAttribute('title',enabled?'إيقاف الوهج الذهبي':'تفعيل الوهج الذهبي');

  button?.addEventListener('click',()=>{
    const next=!root.classList.contains('gold-lumen');
    root.classList.toggle('gold-lumen',next);
    storage.set('gold-lumen',next);
    button.setAttribute('aria-pressed',String(next));
    button.setAttribute('aria-label',next?'إيقاف الوهج الذهبي':'تفعيل الوهج الذهبي');
    button.setAttribute('title',next?'إيقاف الوهج الذهبي':'تفعيل الوهج الذهبي');
  });
}
