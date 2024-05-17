
import React,{useState,useEffect} from "react";
import { Input } from "antd"; 

const { TextArea } = Input;

const GenerateSnippet = () => {
    const [popups, setPopups] = useState([]);

    useEffect(() => {
        fetchPopups();
    }, []);

    const fetchPopups = async () => {
        try {
            const response = await fetch('https://popupbackend-jyry.onrender.com/api/v1/pop/all');
            const popupsData = await response.json();
            setPopups(popupsData);
        } catch (error) {
            console.error("Error fetching popups:", error);
        }
    };

    const generateSnippet = () => {
        return `
            <script>
                (function() {
                    ${generatePopupDisplayScript()}
                })();
            </script>
        `;
    };

    const generatePopupDisplayScript = () => {
        return popups.map(popup => {
            return `
                setTimeout(() => {
                    const toast = document.createElement('div');
                    toast.style.position = 'fixed';
                    toast.style.bottom = '10px';
                    toast.style.right = '10px';
                    toast.style.padding = '10px';
                    toast.style.backgroundColor = '#333';
                    toast.style.color = '#fff';
                    toast.style.zIndex = 1000;
                    toast.innerText = '${popup.content}';

                    document.body.appendChild(toast);

                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, ${popup.hideDuration});

                }, ${popup.startDelay});
            `;
        }).join('');
    };
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Integrate Popups with Your Website</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        Copy and paste the following code into your website's HTML:
        </p>
      </div>
      <div className="work-section-bottom">
      <TextArea value={generateSnippet()} autoSize={{ minRows: 10 }} readOnly />
      </div>
    </div>
  );
};

export default GenerateSnippet;

