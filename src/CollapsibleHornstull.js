import useCollapse from 'react-collapsed';
import test from './icons/test360.png';


export default function CollapsibleHornstull() {
	
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
		duration:10
	});

return (
    <div className="Hornstull-container">
        <div className="header" {...getToggleProps()}>
            {isExpanded ? '' : 'Expand'}
		        <div {...getCollapseProps()}>
            <div className="content">
				<h1 style={{ padding: "10px 20px", textAlign: "center"}}> Hornstull </h1>
				<img src={test} alt="Paris" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '50vw'}}/>
				<h2 style={{ padding: "10px 20px", textAlign: "center"}}> Topic 1  </h2>
				<p style={{ padding: "10px 20px", textAlign: "center"}}> text about topic  </p>
				<h2 style={{ padding: "10px 20px", textAlign: "center"}}> Topic 2  </h2>
				<p style={{ padding: "10px 20px", textAlign: "center"}}> text about topic  </p>
            </div>
        </div>

        </div>
    </div>
    );
}
