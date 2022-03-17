import useCollapse from 'react-collapsed';
import barbro from './icons/barbro.png';
import bitza from './icons/bitza.png';
import chelas from './icons/chelas.png';
import warung from './icons/warung.png';
import tjoget from './icons/tjoget.png';


export default function CollapsibleTjoget() {
	
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
		duration:10
	});

return (
    <div className="Hornstull-container">
        <div className="header" style={{border: "solid #ffeeec 0.1px", boxShadow: "0.1px 0.1px 0.1px 0.1px #ffeeec"}} {...getToggleProps()}>
            {isExpanded ? '' : 'Expand'}
		        <div className="content" style={{border: "solid #ffeeec 0.1px", boxShadow: "0.1px 0.1px 0.1px 0.1px #ffeeec"}} {...getCollapseProps()}>
            
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> Tjoget </h2>
				<img src={tjoget} alt="tjoget" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				På Hornsbruksgatan kan du äta finmat i casualmiljö och sippa på en välblandad drink i baren. Här hittar du Tjoget, ett prisbelönt koncept som inkluderar restaurang, cocktailbar, vinbar och ölkafé.
				</p>
				
				

          
        </div>

        </div>
    </div>
    );
}
//<a class='hnet' href='https://bar-bro.se/' target="_blank" title="Opens in a new window">Boka bord här</a>
//				</a>
