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
                            <div className="talk_right_letter">
                                <div className="talk_right_letter_title">
                                    <div className="letter_top">
                                        <div className="letter_top_tag">General</div> 
                                        <div className="letter_top_title">bsgg.kr</div> 
                                        <div className="letter_top_button">
                                            수정
                                            <div className="talk_password_tooltip">
                                                <input type="password" className="talk_password_tooltip_input" placeholder="비밀번호 입력"></input>
                                                <div className="talk_password_tooltip_cancel">취소</div>
                                                <div className="talk_password_tooltip_edit">수정</div>
                                            </div> 
                                        </div> 
                                        <div className="letter_top_button">
                                            삭제
                                            <div className="talk_password_tooltip">
                                                <input type="password" className="talk_password_tooltip_input" placeholder="비밀번호 입력"></input>
                                                <div className="talk_password_tooltip_cancel">취소</div>
                                                <div className="talk_password_tooltip_edit">삭제</div>
                                            </div> 
                                        </div> 
                                    </div> 
                                    <div className="letter_bot">
                                        <div className="letter_writter">익명 (58.575.575.0)</div> 
                                        <div className="letter_time">20/01/01 14:04</div> 
                                        <div className="letter_view">조회수 1525</div> 
                                        <div className="letter_reply">댓글 155</div> 
                                        <div className="letter_like">추천 5</div>
                                    </div>
                                </div>
                                <div className="talk_right_letter_board">
                                    아아아ㅏ아아아아아아아아아아아아
                                </div>
                                <div className="talk_right_letter_bot">
                                    <div className="talk_right_reply_comments">
                                        <div className="letter_bot_like"> 
                                            <div className="letter_bot_like_tri"></div>
                                            추천
                                        </div>
                                        <div className="letter_bot_report">신고
                                            <div className="talk_report_tooltip">
                                                    <input className="talk_report_tooltip_input" placeholder="신고 사유"></input>
                                                <div className="talk_report_tooltip_cancel">취소</div>
                                                <div className="talk_report_tooltip_edit">신고</div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="talk_right_reply">
                                <div className="talk_right_reply_text">
                                    <textarea className="talk_right_reply_text_input" placeholder="댓글 입력"></textarea>
                                    <div className="talk_right_reply_name">
                                        <input className="talk_right_reply_name_input" placeholder="닉네임 입력"></input>
                                        <input type="password" className="talk_right_reply_name_input" placeholder="비밀번호 입력"></input>
                                        <div className="talk_right_reply_comments">
                                            <div className="talk_right_reply_comment">등록</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="talk_right_replys">
                                    <div className="talk_right_replys_filter">
                                        <div className="talk_right_replys_filter_tab actived">TOP</div>
                                        <div className="talk_right_replys_filter_tab">NEW</div>
                                    </div>
                                    <div className="talk_right_replys_box">
                                        <div className="talk_right_replys_like">
                                            <div className="talk_right_replys_like_tri"></div>
                                            <div className="talk_right_replys_like_num">55</div>
                                        </div>
                                        <div className="talk_right_replys_text">
                                            <div className="talk_right_replys_name actived">익명 (50.030)</div>
                                            <div className="talk_right_replys_slash">｜</div>
                                            <div className="talk_right_replys_time">1시간 전</div>
                                            <div className="talk_right_replys_main">어어어어어어엉어어어어</div>
                                            <div className="talk_right_replys_buttons">
                                                <div className="talk_right_replys_button">답글</div>
                                                <div className="talk_right_replys_button">신고</div>
                                                <div className="talk_right_replys_button">수정
                                                    <div className="talk_password_tooltip2">
                                                        <input type="password" className="talk_password_tooltip_input" placeholder="비밀번호 입력"></input>
                                                        <div className="talk_password_tooltip_cancel">취소</div>
                                                        <div className="talk_password_tooltip_edit">삭제</div>
                                                    </div> 
                                                </div>
                                                <div className="talk_right_replys_button">삭제
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="talk_right_replys_box2">
                                        <div className="talk_right_replys_text">
                                            <div className="talk_right_replys_L">
                                                <div className="talk_right_replys_icon">└</div>
                                            </div>
                                            <div className="talk_right_replys_name">익명 (50.030)</div>
                                            <div className="talk_right_replys_slash">｜</div>
                                            <div className="talk_right_replys_time">1시간 전</div>
                                            <div className="talk_right_replys_main">어어어어어어엉어어어어</div>
                                            <div className="talk_right_replys_buttons">
                                                <div className="talk_right_replys_button">답글</div>
                                                <div className="talk_right_replys_button">신고</div>
                                                <div className="talk_right_replys_button">수정</div>
                                                <div className="talk_right_replys_button">삭제
                                                    <div className="talk_password_tooltip2">
                                                            <input type="password" className="talk_password_tooltip_input" placeholder="비밀번호 입력"></input>
                                                        <div className="talk_password_tooltip_cancel">취소</div>
                                                        <div className="talk_password_tooltip_edit">삭제</div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="talk_right_reply_text2">
                                        <textarea className="talk_right_reply_text_input2" placeholder="댓글 입력"></textarea>
                                        <div className="talk_right_reply_name">
                                            <input className="talk_right_reply_name_input" placeholder="닉네임 입력"></input>
                                            <input type="password" className="talk_right_reply_name_input" placeholder="비밀번호 입력"></input>
                                            <div className="talk_right_reply_comments">
                                                <div className="talk_right_reply_comment">등록</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="talk_right_replys_box">
                                        <div className="talk_right_replys_like">
                                            <div className="talk_right_replys_like_tri"></div>
                                            <div className="talk_right_replys_like_num">55</div>
                                        </div>
                                        <div className="talk_right_replys_text">
                                            <div className="talk_right_replys_name">익명 (50.030)</div>
                                            <div className="talk_right_replys_slash">｜</div>
                                            <div className="talk_right_replys_time">1시간 전</div>
                                            <div className="talk_right_replys_main">어어어어어어엉어어어어</div>
                                            <div className="talk_right_replys_buttons">
                                                <div className="talk_right_replys_button">답글</div>
                                                <div className="talk_right_replys_button">신고</div>
                                                <div className="talk_right_replys_button">수정</div>
                                                <div className="talk_right_replys_button">삭제</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="talk_right_reply_text3">
                                        <textarea className="talk_right_reply_text_input2" placeholder="댓글 수정"></textarea>
                                        <div className="talk_right_reply_name">
                                            <div className="talk_right_reply_comments">
                                                <div className="talk_right_reply_cancel">취소</div>
                                                <div className="talk_right_reply_edit">수정</div>
                                            </div>
                                        </div>
                                    </div>
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