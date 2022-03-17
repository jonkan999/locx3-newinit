import useCollapse from 'react-collapsed';



export default function PulldownPopup(object) {
	
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
		expandStyles: {border: "solid #ffeeec 0.1px", boxShadow: "0.1px 0.1px 0.1px 0.1px #ffeeec"},
		collapseStyles: {border: "solid #ffeeec 0.1px", boxShadow: "0.1px 0.1px 0.1px 0.1px #ffeeec"},
		duration:1100
	});


return (
    <div className="PulldownPopup-container">
        <div className="header" style={{ textAlign: "center", fontSize: "1.8vh", display: "block",paddingTop: "1vh"}} {...getToggleProps()}>
            {isExpanded ? '' : object.PopupHeader}
            <div className='content' {...getCollapseProps()} >
			<h2 style={{ textAlign: "center", fontSize: "1.8vh", display: "block", paddingTop: "0vh"}}> {object.PopupHeader} </h2>
			<h2 style={{ textAlign: "center", fontSize: "1.5vh", display: "block", paddingTop: "0vh", paddingLeft: "3.5vw", paddingRight: "3.5vw",fontWeight: "normal"}}> BRF {object.PopupHeader}, 81 st bostadsrätter och ytterliggare 2 % uthyrningsbaryta i föreningen. 62 kr i avgift och 8 000 kr i snittbelåning kvadratmeter <a style={{color: "#128279"}} href="http://www.brfbulten23.com/" target="_blank" title="Opens in a new window"> länk </a></h2>

				
				

        </div>

        </div>
    </div>
    );
}
//<a class='hnet' href='https://bar-bro.se/' target="_blank" title="Opens in a new window">Boka bord här</a>
//				</a>

				//<h2 style={{ margin: "0", textAlign: "center", fontSize: "1.5vh", display: "block", paddingTop: "0"}}> {PopupContent.PopupContent} </h2>
				
				//<p style={{ margin: "0", textAlign: "center", fontSize: "1.5vh", display: "block", paddingTop: "1vh",fontWeight: "normal"}}> 
				//På Hornsbruksgatan kan du äta finmat i casualmiljö och sippa på en välblandad drink i baren. Här hittar du Tjoget, ett prisbelönt koncept som inkluderar restaurang, cocktailbar, vinbar och ölkafé.
				//</p>