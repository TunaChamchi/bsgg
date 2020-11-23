import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
// 이 서브 라이브러리들이 내 locale 파일을 사용할 수 있게 해준다
//import en from '../locale/en';
import ko from 'locale/ko';
import App from 'shared/App';

//
const locale = {
    "ko": ko
};

// 저장되어 있는 언어 데이터를 가져온다
const defaultLang = localStorage.getItem('lang') || 'ko';

// 
function flattenMessages(nestedMessages, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value       = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

let flattedMessages = flattenMessages(locale[defaultLang]);

const Root = () => (
    <BrowserRouter>
        <IntlProvider locale={defaultLang} messages={flattedMessages}>
            <App/>
        </IntlProvider>
    </BrowserRouter>
);

export default Root;