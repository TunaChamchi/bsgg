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
                            <div className="talk_right_banner">
                                <div className="talk_right_banners">
                                    <div className="talk_right_write">
                                        <img className="talk_left_tab_img1" src="img/Talk/talk.png" />
                                        </div>
                                    <div className="talk_right_tab actived">
                                        <img className="talk_left_tab_img" src="img/Talk/hot.png" />
                                        <span className="talk_left_tab_span">인기</span>
                                        </div>
                                    <div className="talk_right_tab">
                                        <img className="talk_left_tab_img" src="img/Talk/new.png" />
                                        <span className="talk_left_tab_span">최신</span>
                                        </div>
                                    <div className="talk_right_tab">
                                        <img className="talk_left_tab_img" src="img/Talk/top.png" />
                                        <span className="talk_left_tab_span">최고</span>
                                    </div>
                                </div>
                                <div className="talk_right_search">
                                    <input className="talk_right_search_input" placeholder="검색"></input>
                                </div>
                            </div>
                            <div className="talk_right_board">
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">General</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                                <div className="talk_right_board_box">
                                    <div className="board_like">
                                        <div className="board_like_tri"></div>
                                        <div className="board_like_num">52</div>
                                    </div>
                                    <img className="board_img" src="img/Rank/재키.jpg" />
                                    <div className="board_top">
                                        <div className="board_top_tag">자유</div> 
                                        <div className="board_top_title">bsgg.kr</div> 
                                    </div> 
                                    <div className="board_bot">
                                        <div className="board_top_writter">익명 (58.575.575.0)</div> 
                                        <div className="board_top_reply">댓글 155개</div> 
                                        <div className="board_top_time">5시간 전</div> 
                                    </div>
                                </div>
                            </div>
                            <div className="talk_right_board_button">
                                <div className="talk_right_board_pre">이전</div>
                                <div className="talk_right_board_next">다음</div>
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