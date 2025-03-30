import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
const isPublic = () => {
  return SetMetadata(IS_PUBLIC_KEY, true);
};
export default isPublic;
