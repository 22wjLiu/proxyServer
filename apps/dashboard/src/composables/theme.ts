import { ref, onMounted, onBeforeUnmount } from "vue";
import type { ColorTheme } from "@/type/card";

export function useColorScheme() {
  const theme = ref<ColorTheme>("light");

  const updateTheme = (e?: MediaQueryListEvent) => {
    const isDark = e
      ? e.matches
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme.value = isDark ? "dark" : "light";
  };

  onMounted(() => {
    // 初始化
    updateTheme();
    // 监听系统主题变化
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", updateTheme);
  });

  onBeforeUnmount(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", updateTheme);
  });

  return { theme };
}
