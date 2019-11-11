module Emojis exposing (..)

import Types exposing (Hand(..), Issue(..))


handToEmoji : Hand -> String
handToEmoji hand =
    case hand of
        Gu ->
            "\u{270A}"

        Choki ->
            "\u{270C}"

        Pa ->
            "\u{270B}"


issueToEmoji : Issue -> String
issueToEmoji issue =
    case issue of
        Win ->
            "\u{1F604}勝ち"

        Draw ->
            "\u{1F914}あいこ"

        Lose ->
            "\u{1F623}負け"


errorIcon : String
errorIcon = "\u{1F631}"
