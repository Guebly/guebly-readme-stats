import { ref, watchEffect } from "vue";

const isDark = ref(true);

export function useThemeMode() {
  const toggle = () => {
    isDark.value = !isDark.value;
  };

  watchEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark.value ? "dark" : "light"
    );
  });

  return { isDark, toggle };
}
