import { setProfilePicture } from '../util/avatarSelectionHandlers';
import { useEffect, useState } from 'react';
import { SELFIE } from '../util/enums';
import Image from 'react-bootstrap/Image';

export default function Avatar({ avatar, onClick, className, player_id, src }) {
  const [avatarSrc, setAvatarSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (avatar && setAvatarSrc) {
      setProfilePicture(avatar, setAvatarSrc, player_id);
    }
  }, [avatar, setAvatarSrc, player_id]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsLoaded(false);
  };

  return (
    <>
      {avatar === SELFIE && (
        <div className="image-cropper">
          <Image
            src={src ? src : avatarSrc}
            roundedCircle
            className={className}
            data-avatar-type={avatar}
            alt={isLoaded ? 'ein Selfie' : ''}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onClick={onClick}
          />
        </div>
      )}
      {avatar !== SELFIE && (
        <div className="image-cropper">
          <img
            src={avatarSrc}
            className={className}
            data-avatar-type={avatar}
            alt={isLoaded ? 'ein Avatar' : ''}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onClick={onClick}
          />
        </div>
      )}
    </>
  );
}
