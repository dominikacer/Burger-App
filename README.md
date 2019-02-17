#Dominik Michalik - dominikxmichalik@gmail.com
#nr indeksu 10379 – Informatyka sem VII 


Specyfikacja funkcjonalno-techniczna aplikacji internetowej.


1. Cel projektu :
Przygotowanie aplikacji internetowej w technologii React (framework JavaScriptowy).
Aplikacja ma na celu wizualne komponowanie burgera – po dodaniu odpowiednich składników, w środku burgera pojawiają się komponenty wizualne, następnie możliwość zamówienia sporządzonego dania oraz przechowanie danych do nierelacyjnej bazy danych Firebase.


2. Wymagania funkcjonalne:
Aplikacja będzie składała się ze ściśle powiązanych ze sobą komponentów:
- komponent wyświetlający Burger,
- komponent wyświetlający logo,
- komponent zawierający nawigację,
- komponent zawierający podsumowanie zamówienia,
- komponent zawierający UI (elementy interfejsu użytkownika)

oraz z containerów (kontenerów), które służą do obsługi danych i komponentów
- container wyświetlający Burger
- container wyświetlający podsumowanie zamówienia
- container wyświetlający skompletowane zamówienia

3. Komponent wyświetlający Burger składa się z czterech składowych :
a) ze składników, z których komponujemy Burger-a, są definiowane w tablicy, która jest wyświetlana na froncie, oraz przycisków „Less” , „More” , dzięki którym dodajemy odpowiednio składniki. Przyciski są odpowiednio zwalidowane. 
b) mechanizmu, który przetwarza dane otrzymane po kliknięciu w przyciski „Less”, „More”
c) mechanizmu, który wyświetla przetworzone dane na froncie
d) podsumowanie zamówienia, które widoczne jest po naciśnięciu przycisku „Order Now”

4. Komponent wyświetlający logo:
Odpowiada on tylko i wyłącznie za wyświetlanie logo. Komponent nie powinien być traktowany jako część UI. Komponent ma potencjał na rozwój.

5. Komponent zawierający nawigację, składa się z trzech składowych:
a) Pasek menu głównego
b) Nawigacja na urządzeniach mobilnych – pasek boczny wyświetlany po kliknięciu w ikonę w lewym górym rogu, pojawia się na rozdzielczości 500px - 
c) Kontener opakowujący pasek menu oraz nawigację dla lepszej niezależności i łatwiejszego zarządzania potencjalnym rozwojem aplikacji

6. Komponent zawierający podsumowanie zamówienia, składa się z:
a) Ekranu typu „Thank you page” - z podziękowaniem za złożenie zamówienia, 
wyświetla on skomponowanego odpowiednio wcześniej burgera oraz przyciski nawigacyjne
b) Komponent przetwarza również dane otrzymane z podsumowania zamówienia, oraz wyświetla je komunikując się z bazą danych na froncie. Wyświetlona zostaje ilość i nazwa składnika, oraz cena całego zamówienia

7. Komponent zawierający UI, dla lepszego zarządzania i modyfikacją aplikacji każda część layoutu aplikacji jest odseparowana od siebie odpowiednio.
Pozwala to tworzyć reużywalne elementy i wywoływanie tylko w odpowiednich miejscach potrzebnych dla określonych sytuacji elementów
Przykładowe elementy to: przycisk, input, modal czy spinner. 

8. Kontenery – aplikacja została podzielona na trzy główne kontenery:
a) Kontener budujący Burger, w tym kontenerze ustalamy ceny za odpowiednie składniki, cenę startową, składniki startowe, możliwość zamówienia lub nie oraz obsługę błędów.
Dodatkowo kontener ten głównie odpowiada za komunikację i połączenie między bazą danych Firebase, a frontem i obsługą requestów.

b) Kontener podsumowania zamówienia służy głównie do wyświetlenia efektów komunikacji między warstwą frontową, a bazą danych obsłużoną w kontenerze budującym.

c) Kontener wyświetlający zamówienia, wysyła on tylko żądania do bazy danych i wyświetla je na froncie, mapując każdy element jaki znajdzie po kolei.




9. Wymagania techniczne
a) Aplikacja powinna działać we wszystkich współczesnych przeglądarkach internetowych,
b) Aplikacja nie powinna posiadać żadnych ograniczeń na ilość składników czy złożonych zamówień
c) Aplikacja musi zapewniać wydajną pracę przy wielu zamówieniach
d) Aplikacja powinna działać na użądzeniach mobilnych obsługujących standard HTML5
e) Wyświetlane w podsumowaniu powinny być tylko ilości składników większe od zera, powinna zostać zastosowana walidacja
f) Całość aplikacji musi zostać wykonana o technologie nie wymagające do uruchomienia platformy zakupu jakiegokolwiek oprogramowania
g) Aplikacja powinna działać tylko i wyłącznie po podłączeniu do sieci
h) Aplikacja powinna mieć odpowiednio odseparowaną strukturę danych, pozwalającą na potencjalny rozwój aplikacji 