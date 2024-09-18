import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ACHTUNG:
      // Das sind Default-Einstellung die fuer ALLE Queries gelten.
      //  (Die Einstellungen koennen in jedem Query ueberschrieben werden)
      // Diese Einstellungen habe ich gewaehlt fuer unseren Workshop, in der
      // Hoffnung, dass das damit konfigurierte Verhalten nicht allzu verwirrend ist.
      //
      // In eurer Anwendung muesst ihr pruefen, ob die fuer euch (fachlich)
      // Sinn machen.
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
      // do not retry on technical problems
      retry: false
    }
  }
});
