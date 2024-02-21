import { FaStar } from 'react-icons/fa';
import EntityLink, { EntityLinkExternalProps } from '@/components/EntityLink';
import { TAG_FAVS } from '.';
import { pathForTag } from '@/site/paths';
import { clsx } from 'clsx/lite';

export default function FavsTag({
  type,
  badged,
  contrast,
  countOnHover,
}: {
  countOnHover?: number
} & EntityLinkExternalProps) {
  return (
    <EntityLink
      label={
        badged
          ? <span className="inline-flex gap-1">
            {TAG_FAVS}
            <FaStar
              size={10}
              className="text-amber-500"
            />
          </span>
          : TAG_FAVS}
      href={pathForTag(TAG_FAVS)}
      icon={!badged &&
        <FaStar
          size={12}
          className={clsx(
            'text-amber-500',
            'translate-x-[-1px] translate-y-[3.5px]',
          )}
        />}
      type={type}
      hoverEntity={countOnHover}
      badged={badged}
      contrast={contrast}
    />
  );
}
