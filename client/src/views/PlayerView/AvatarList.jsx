import Avatar from '../../components/Avatar';
import { SELFIE } from '../../util/enums';

export default function AvatarList({
  previewUrl,
  avatarSelection,
  setAvatarSelection,
}) {
  const male1 = 'man1.png';
  const male2 = 'man2.png';
  const male3 = 'man3.png';
  const female1 = 'woman1.png';
  const female2 = 'woman3.png';
  const female3 = 'woman2.png';
  const animal1 = 'giraffe.png';
  const animal2 = 'fox.png';
  const animal3 = 'weasel.png';

  function clickHandler(ev) {
    const avatarType = ev.target.dataset.avatarType;
    setAvatarSelection(avatarType);
  }

  function getClassName(avatar) {
    return avatarSelection === avatar ? 'selected' : '';
  }

  return (
    <div id="avatar-carousel-container">
      <div>
        <Avatar
          avatar={male1}
          onClick={clickHandler}
          className={getClassName(male1)}
        />
        <Avatar
          avatar={male2}
          onClick={clickHandler}
          className={getClassName(male2)}
        />
        <Avatar
          avatar={male3}
          onClick={clickHandler}
          className={getClassName(male3)}
        />
      </div>
      <div>
        <Avatar
          avatar={female1}
          onClick={clickHandler}
          className={getClassName(female1)}
        />
        <Avatar
          avatar={female2}
          onClick={clickHandler}
          className={getClassName(female2)}
        />
        <Avatar
          avatar={female3}
          onClick={clickHandler}
          className={getClassName(female3)}
        />
      </div>
      <div>
        <Avatar
          avatar={animal1}
          onClick={clickHandler}
          className={getClassName(animal1)}
        />
        <Avatar
          avatar={animal2}
          onClick={clickHandler}
          className={getClassName(animal2)}
        />
        <Avatar
          avatar={animal3}
          onClick={clickHandler}
          className={getClassName(animal3)}
        />
      </div>
      {previewUrl && (
        <div>
          <Avatar
            avatar={SELFIE}
            onClick={clickHandler}
            className={getClassName(SELFIE)}
            src={previewUrl}
          />
        </div>
      )}
    </div>
  );
}
