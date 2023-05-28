type OS = 'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'indeterminate';

const platformMatchers: Record<OS, RegExp> = {
  windows: /Win/,
  macos: /Mac/,
  linux: /Linux/,
  android: /Android/,
  ios: /iPhone|iPad|iPod/,
  indeterminate: /.*/,
};

const getOS = (): OS => {
  const { userAgent } = navigator;
  return (
    (Object.keys(platformMatchers).find((platform) =>
      platformMatchers[platform as OS].test(userAgent),
    ) as OS) || 'indeterminate'
  );
};

/** useOS hook returns the OS of the user.
 * @returns {OS} - The OS of the user.
 * @example
 * const os = useOS();
 * console.log(os); // 'macos'
 */
const useOS = (): OS => (typeof navigator !== 'undefined' ? getOS() : 'indeterminate');

export default useOS;
