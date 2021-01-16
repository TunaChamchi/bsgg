import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';
import { Header, SubBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'

class Main extends Component {
    render() {
        const { intl } = this.props;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner actived={'Tier'} />
                    <div className="talk_top">
                        <img clssName="talk_top_img" src="img/Wallpaper/World.jpg" />
                    </div>
                    <div className="talk_main">
                        <div className="talk_left">
                            <div className="talk_left_span">TAG</div>
                            <div className="talk_left_tabs">
                                <div className="talk_left_tab actived">전체</div>
                                <div className="talk_left_tab">자유</div>
                                <div className="talk_left_tab">질문</div>
                                <div className="talk_left_tab">공략</div>
                                <div className="talk_left_bottom"></div>
                            </div>
                        </div>
                        <div className="talk_right">
                            <div className="talk_right_talk">
                                <div className="talk_right_talk_tag">TAG</div>
                                <div className="talk_right_talk_tag_buttons">
                                    <div className="talk_right_talk_tag_button actived">자유</div>
                                    <div className="talk_right_talk_tag_button">질문</div>
                                    <div className="talk_right_talk_tag_button">공략</div>
                                </div>
                                <input className="talk_right_talk_title" placeholder="제목"></input>
                                <textarea className="talk_right_talk_board" placeholder="내용 작성"></textarea>
                                <input className="talk_right_talk_name" placeholder="닉네임 입력"></input>
                                <input type="password" className="talk_right_talk_name" placeholder="비밀번호 입력"></input>
                                <div className="talk_right_reply_comments">
                                    <div className="talk_right_talk_button">등록</div>
                                    <div className="talk_right_talk_button">취소</div>
                                </div>
                            </div>
                        </div>
                    </div>
                <AdS type={'Main'}/>
                <Footer />
                {/* <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async /> */}
                {/* <ScriptTag src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async /> */}
            </div>
        );
    };
}

export default injectIntl(Main);