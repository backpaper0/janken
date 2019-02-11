module Emojis exposing (..)

import Dict exposing (..)

hands : Dict String String
hands =
    fromList [("GU", "\u{270A}"), ("CHOKI", "\u{270C}"), ("PA", "\u{270B}")]


issues : Dict String String
issues =
    fromList [("WIN", "\u{1F604}勝ち"), ("DRAW", "\u{1F914}あいこ"), ("LOSE", "\u{1F623}負け")]
