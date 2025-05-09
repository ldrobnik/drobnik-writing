import React, { useEffect, useState } from "react";
import { CentredPhotoWrapper, Photo, PhotoLink } from "../../../styles/shared";
import { AnimatedPhoto } from "../../../animations/shared";
import SmallSpinner from "../../UI/SmallSpinner/SmallSpinner";

const BookPhoto = (props) => {
  //specifies whether the photo is visible (it is turn visible when the photo is loaded
  const [visible, setVisible] = useState(false);

  //specifies the image source
  const [imageSrc, setImageSrc] = useState("");

  //sets photo visibility to true
  const showPhoto = () => {
    setVisible(true);
  };

  //imports the appropriate image
  const importImage = (src) => {
    import(`../../../assets/images/${src}`)
      .then((res) => {
        setImageSrc(res.default);
      })
      .catch((err) => console.log(src, err));
  };

  useEffect(() => {
    //import the image once the component loads
    importImage(props.src);
  }, []);

  return (
    <CentredPhotoWrapper>
      <AnimatedPhoto pose={visible ? "visible" : "hidden"}>
        {props.link ? (
          <PhotoLink>
            <a href={props.link} target="_blank" rel="noopener noreferrer">
              <img src={imageSrc} alt={props.alt} onLoad={showPhoto} />
            </a>
          </PhotoLink>
        ) : (
          <PhotoLink>
            <img src={imageSrc} alt={props.alt} onLoad={showPhoto} />
          </PhotoLink>
        )}
      </AnimatedPhoto>
      {!imageSrc && <SmallSpinner />}
    </CentredPhotoWrapper>
  );
};

export default BookPhoto;
