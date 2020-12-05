import ko from 'locale/ko';
import en from 'locale/en';
import cn from 'locale/cn';

export const locale = {
    "ko": {
        name: '한국어',
        data: ko
    },
    "en": {
        name: 'English',
        data: en
    },
    "cn": {
        name: '简体中文',
        data: cn
    },
};

// 저장되어 있는 언어 데이터를 가져온다
export const defaultLang = () => {
    return localStorage.getItem('lang') || 'ko';
}

export const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
}
