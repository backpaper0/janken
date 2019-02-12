module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Dict exposing (Dict)
import Types exposing (..)
import Emojis
import Apis


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model Init False Gu Gu Draw, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Janken hand ->
            ( { model | phase = Started, player = hand }, Apis.postJanken hand )

        Reset ->
            ( { model | phase = Init }, Cmd.none )

        Finish nextModel ->
            ( nextModel, Cmd.none )


view : Model -> Html Msg
view { phase, error, player, enemy, issue } =
    let
        handText =
            Emojis.handToEmoji >> text

        issueText =
            Emojis.issueToEmoji >> text

        handButton hand =
            button [ disabled (phase /= Init), onClick (Janken hand) ] [ handText hand ]

        hidden cond =
            if cond then
                [ class "hidden" ]
            else
                []
    in
        div [ class "root" ]
            [ p [] [ text "じゃんけん……" ]
            , p []
                [ handButton Gu
                , handButton Choki
                , handButton Pa
                , button [ disabled (phase /= Finished), onClick Reset ] [ text "もう一回" ]
                ]
            , p
                (phase == Init |> hidden)
                [ text "ぽん！" ]
            , div
                (phase /= Finished || error |> hidden)
                [ p [ class "hand" ] [ text "あなたは", span [] [ handText player ] ]
                , p [ class "hand" ] [ text "相手は", span [] [ handText enemy ] ]
                , p [ class "issue" ] [ issueText issue ]
                ]
            , div
                (phase /= Finished || (not error) |> hidden)
                [ p [ class "error" ] [ text "通信エラー", text Emojis.errorIcon ]
                ]
            ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }
