module Apis exposing (..)

import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Types exposing (..)


postJanken : Hand -> Cmd Msg
postJanken hand =
    let
        jankenEncoder player =
            Encode.object [ ( "player", player |> handToString |> Encode.string ) ]

        mapper a b c =
            ( a, b, c )

        jankenDecoder =
            Decode.map3 mapper
                (Decode.field "player" (Decode.string |> Decode.map stringToHand))
                (Decode.field "enemy" (Decode.string |> Decode.map stringToHand))
                (Decode.field "issue" (Decode.string |> Decode.map stringToIssue))

        resultToMsg result =
            case result of
                Ok ( Just player, Just enemy, Just issue ) ->
                    Finish (Model Finished False player enemy issue)

                _ ->
                    Finish (Model Finished True Gu Gu Draw)
    in
        Http.post
            { url = "/api/janken"
            , body = Http.jsonBody (jankenEncoder hand)
            , expect = Http.expectJson resultToMsg jankenDecoder
            }
